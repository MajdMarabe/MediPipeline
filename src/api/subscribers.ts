import express from "express";
import { db } from "../db/index.js";
import { subscribers } from "../db/schema.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { pipelineId, url } = req.body;

    if (!pipelineId || !url) {
      return res.status(400).json({ error: "pipelineId and url required" });
    }

    const newSub = await db.insert(subscribers).values({
      pipelineId,
      url,
    }).returning();

    return res.status(201).json(newSub[0]);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;