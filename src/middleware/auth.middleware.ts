import { Request, Response, NextFunction } from 'express';
import { getBearerToken, validateJWT } from '../utils/authHelpers.js';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function authMiddleware(secret: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = getBearerToken(req);

      const userId = validateJWT(token, secret);

      req.user = { id: userId };

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };
}
