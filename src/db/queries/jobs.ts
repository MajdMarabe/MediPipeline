import { db } from "../index.js";
import { jobs } from "../schema.js";
import { eq, and } from "drizzle-orm";

export async function createJob(pipelineId: string, payload: any) {
  return db.insert(jobs).values({
    pipelineId,
    payload,
    status: "pending",
    attempts: "0",
  });
}

export async function getPendingJobs() {
  return db.query.jobs.findMany({
    where: (j) => eq(j.status, "pending"),
  });
}

export async function updateJobStatus(jobId: string, status: string) {
  return await db.update(jobs)
  .set({ status, updatedAt: new Date() })
  .where(eq(jobs.id, jobId));  
}