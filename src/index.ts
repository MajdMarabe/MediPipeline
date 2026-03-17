import express from "express";
import authRouter from "./api/auth.js"; 

const app = express();

app.use(express.json());
app.use(express.static("."));

app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.send("Pipeline API is running!");
});

const PORT =  8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});