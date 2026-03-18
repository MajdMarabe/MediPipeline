import { Router, Request, Response } from "express";
import {
  createPipeline,
  getPipelinesByUser,
  getPipelineById,
  updatePipeline,
  deletePipeline,
} from "../db/queries/pipelines.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware(process.env.JWT_SECRET!));
interface AuthRequest extends Request {
  user?: { id: string };
}

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { name, actionType } = req.body;
    const userId = req.user?.id;

    if (!name || !actionType) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const pipeline = await createPipeline({
      name,
      actionType,
      userId: userId!,
    });

    res.status(201).json(pipeline);
  } catch {
    res.status(500).json({ error: "Failed to create pipeline" });
  }
});


router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const pipelines = await getPipelinesByUser(userId!);

    res.json(pipelines);
  } catch {
    res.status(500).json({ error: "Failed to fetch pipelines" });
  }
});

router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;
    const pipeline = await getPipelineById(id, userId!);

    if (!pipeline) {
      return res.status(404).json({ error: "Pipeline not found" });
    }

    res.json(pipeline);
  } catch {
    res.status(500).json({ error: "Failed to fetch pipeline" });
  }
});

router.put("/:id", async (req: AuthRequest, res: Response) => {
  try {
 const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;
    const { name, actionType } = req.body;
    const userId = req.user?.id;

    const updated = await updatePipeline(id, userId!, {
      name,
      actionType,
    });

    if (!updated) {
      return res.status(404).json({ error: "Pipeline not found" });
    }

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update pipeline" });
  }
});
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  try {
 const id = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;
  const userId = req.user?.id;

    const deleted = await deletePipeline(id, userId!);

    if (!deleted) {
      return res.status(404).json({ error: "Pipeline not found" });
    }

    res.json({ message: "Pipeline deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete pipeline" });
  }
});
export default router;