
import { db } from "../index.js";
import { subscribers } from "../schema.js";
import { eq } from "drizzle-orm";

export async function getSubscribersByPipeline(pipelineId: string) {
  return db.query.subscribers.findMany({
    where: (s) => eq(s.pipelineId, pipelineId),
  });
}
export async function getAllSubscribers() {
  return db.query.subscribers.findMany();
}

export async function deleteSubscriber(subscriberId: string) {
  const result = await db
    .delete(subscribers)
    .where(
    
        eq(subscribers.id, subscriberId),
      
    )
    .returning();

  return result.length ? result[0] : null;
}