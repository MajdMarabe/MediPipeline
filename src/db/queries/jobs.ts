import { db } from "../index.js";
import { jobs, deliveries } from "../schema.js";
import { eq, sql } from "drizzle-orm";



export async function createJob(pipelineId: string, payload: any) {
  return db.insert(jobs).values({
    pipelineId,
    payload,
    status: "pending",
    attempts: 0,
  });
}


export async function getPendingJobs() {
  return db.query.jobs.findMany({
    where: (j) => eq(j.status, "pending"),
  });
}

export async function updateJobStatus(jobId: string, status: string) {
  return db
    .update(jobs)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId));
}

export async function incrementAttempts(jobId: string) {
  return db
    .update(jobs)
    .set({
      attempts: sql`${jobs.attempts} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId));
}


export async function getJobById(jobId: string) {
  const job = await db.query.jobs.findFirst({
    where: (j) => eq(j.id, jobId),
  });

  return job;
}



export async function getAllJobs() {
  return db.query.jobs.findMany();
}



export async function getJobsByStatus(status: string) {
  return db.query.jobs.findMany({
    where: (j) => eq(j.status, status),
  });
}

export async function getJobDeliveries(jobId: string) {
  return db.query.deliveries.findMany({
    where: (d) => eq(d.jobId, jobId),
  });
}


export async function createDeliveryLog(
  jobId: string,
  url: string,
  status: string
) {
  return db.insert(deliveries).values({
    jobId,
    url,
    status,
  });
}
  