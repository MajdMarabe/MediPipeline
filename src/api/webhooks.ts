import express from "express";
import { createJob } from "../db/queries/jobs.js";
import{getPipelineById} from "../db/queries/pipelines.js";

const router = express.Router();

router.post("/:pipelineId", async (req, res) => {
  const { pipelineId } = req.params;
  const payload = req.body;

  const pipeline =getPipelineById(pipelineId, ""); 
  if (!pipeline) return res.status(404).send("Pipeline not found");

  await createJob(pipelineId, payload);

  return res.status(202).send();
});

export default router;