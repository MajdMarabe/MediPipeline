import express from "express";
import authRouter from "./api/auth.js";
import pipelineRouter from "./api/pipelines.js";
import webhookRouter from "./api/webhooks.js";
import { startWorker } from "./workers/jobWorker.js";
import subscriberRouter from "./api/subscribers.js";
import jobRouter from "./api/jobs.js";
const app = express();
app.use(express.json());
app.use(express.static("."));
app.use("/users", authRouter);
app.use("/pipelines", pipelineRouter);
app.use("/webhooks", webhookRouter);
app.use("/subscribers", subscriberRouter);
app.use("/jobs", jobRouter);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Pipeline API is running!");
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
startWorker();
