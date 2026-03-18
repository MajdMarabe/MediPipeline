import { db } from "../index.js";
import { pipelines } from "../schema.js";
import { eq, and } from "drizzle-orm";

export type NewPipeline = typeof pipelines.$inferInsert;

export async function createPipeline(data: NewPipeline) {
  const [result] = await db
    .insert(pipelines)
    .values(data)
    .returning();

  return result;
}

export async function getPipelinesByUser(userId: string) {
  return await db
    .select()
    .from(pipelines)
    .where(eq(pipelines.userId, userId));
}

export async function getPipelineById(pipelineId: string, userId: string) {
    if(userId==""){
         const result = await db
    .select()
    .from(pipelines)
    .where(
      and(
        eq(pipelines.id, pipelineId),
      )
    )
    .limit(1);

  return result.length ? result[0] : null;
    }
  const result = await db
    .select()
    .from(pipelines)
    .where(
      and(
        eq(pipelines.id, pipelineId),
        eq(pipelines.userId, userId)
      )
    )
    .limit(1);

  return result.length ? result[0] : null;
}

export async function updatePipeline(
  pipelineId: string,
  userId: string,
  data: Partial<NewPipeline>
) {
  const [result] = await db
    .update(pipelines)
    .set(data)
    .where(
      and(
        eq(pipelines.id, pipelineId),
        eq(pipelines.userId, userId)
      )
    )
    .returning();

  return result;
}

export async function deletePipeline(pipelineId: string, userId: string) {
  const result = await db
    .delete(pipelines)
    .where(
      and(
        eq(pipelines.id, pipelineId),
        eq(pipelines.userId, userId)
      )
    )
    .returning();

  return result.length ? result[0] : null;
}