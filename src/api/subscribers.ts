import express from 'express';
import { db } from '../db/index.js';
import { subscribers } from '../db/schema.js';
import { getAllSubscribers } from '../db/queries/subscribers.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { pipelineId, url } = req.body;

    if (!pipelineId || !url) {
      return res.status(400).json({ error: 'pipelineId and url required' });
    }

    const newSub = await db
      .insert(subscribers)
      .values({
        pipelineId,
        url,
      })
      .returning();

    return res.status(201).json(newSub[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});
router.get('/', async (req, res) => {
  try {
    const subs = await getAllSubscribers();
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('innn');
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const deleted = await db
      .delete(subscribers)
      .where(eq(subscribers.id, id))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.json({ message: 'Subscriber deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete subscriber' });
  }
});

export default router;
