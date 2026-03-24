import { Router } from 'express';
import {
  hashPassword,
  checkPasswordHash,
  makeJWT,
  getBearerToken,
} from '../utils/authHelpers.js';
import {
  createUser,
  getUserByEmail,
  getUserById,
} from '../db/queries/users.js';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const existing = await getUserByEmail(email);
  if (existing)
    return res.status(409).json({ error: 'Email already registered' });

  const hashedPassword = await hashPassword(password);
  const newUser = await createUser({ email, hashedPassword });

  res.status(201).json({ id: newUser.id, email: newUser.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await checkPasswordHash(password, user.hashedPassword);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  const token = makeJWT(user.id, 3600, process.env.JWT_SECRET!);
  res.json({ token });
});


export default router;
