import { db } from "../index.js";
import { deliveries } from "../schema.js";
import { eq } from "drizzle-orm";

export async function createDelivery({
  jobId,
  url,
  status,
  attempts,
}: {
  jobId: string;
  url: string;
  status: string;
  attempts: number;
}) {
    console.log("Creating delivery log:", { jobId, url, status, attempts });
  return db.insert(deliveries).values({
    jobId,
    url,
    status,
    attempts: attempts,
  });
}
export async function getDeliveriesByJobId(jobId: string) {
  return db.query.deliveries.findMany({
    where: (d) => eq(d.jobId, jobId),
  });
}

export async function getDeliveryById(id: string) {
  return db.query.deliveries.findFirst({
    where: (d) => eq(d.id, id),
  });
}