import { getSubscribersByPipeline } from "../db/queries/subscribers.js";
import { getPendingJobs, updateJobStatus } from "../db/queries/jobs.js";
import { getPipelineById } from "../db/queries/pipelines.js";
import { medicationReminderHandler } from "../actions/medication_reminder_handler.js";
import { labResultReceived } from "../actions/labResultReceived.js";
import { alertHighVitals } from "../actions/alertHighVitals.js";

async function processAction(actionType: string, payload: any) {
  switch (actionType) {
    case "medication_time":
      return medicationReminderHandler(payload);

    case "lab_result_ready":
      return labResultReceived(payload);

    case "vitals_recorded":
      return alertHighVitals(payload);

    default:
      throw new Error("Unknown action");
  }
}
/**    */
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
const subscribers = await getSubscribersByPipeline(job.pipelineId);

for (const sub of subscribers) {
  const success = await sendToSubscriber(sub.url, result);

  if (!success) {
    console.log("Failed:", sub.url);
  }
}

        await updateJobStatus(job.id, "completed");

      } catch (err) {
        console.error("Job failed:", job.id);

        await updateJobStatus(job.id, "failed");
      }
    }
  }, 5000);
}
/********** */
async function sendToSubscriber(url: string, data: any) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed request");
    }

    return true;
  } catch (err) {
    return false;
  }
}