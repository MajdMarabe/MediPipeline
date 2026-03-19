
import { db } from "../index.js";
import { subscribers } from "../schema.js";
import { eq } from "drizzle-orm";

export async function getSubscribersByPipeline(pipelineId: string) {
  return db.query.subscribers.findMany({
    where: (s) => eq(s.pipelineId, pipelineId),
  });
}