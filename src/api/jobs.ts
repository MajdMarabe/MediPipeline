import express from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByStatus,
  getJobDeliveries,
} from '../db/queries/jobs.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

router.get('/:id/deliveries', async (req, res) => {
  try {
    const deliveries = await getJobDeliveries(req.params.id);
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
});

export default router;
