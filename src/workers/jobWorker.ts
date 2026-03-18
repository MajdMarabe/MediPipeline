import { getPendingJobs, updateJobStatus } from "../db/queries/jobs.js";
import { getPipelineById } from "../db/queries/pipelines.js";

// الأكشن
async function processAction(actionType: string, payload: any) {
  switch (actionType) {
    case "uppercase":
      return { result: payload.text.toUpperCase() };

    case "addTimestamp":
      return { ...payload, timestamp: new Date() };

    case "filter":
      return { filtered: payload.value > 10 };

    default:
      throw new Error("Unknown action");
  }
}

// worker
export async function startWorker() {
  console.log("Worker started...");

  setInterval(async () => {
    const jobs = await getPendingJobs();

    for (const job of jobs) {
      try {
        console.log("Processing job:", job.id);

        await updateJobStatus(job.id, "processing");

        const pipeline = await getPipelineById(job.pipelineId,"");

        if (!pipeline) {
          throw new Error("Pipeline not found");
        }

        const result = await processAction(
          pipeline.actionType,
          job.payload
        );

        console.log("Result:", result);

        await updateJobStatus(job.id, "completed");

      } catch (err) {
        console.error("Job failed:", job.id);

        await updateJobStatus(job.id, "failed");
      }
    }
  }, 5000);
}