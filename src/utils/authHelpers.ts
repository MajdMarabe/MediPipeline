import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

export function makeJWT(userID: string, expiresIn: number, secret: string): string {
  const iat = Math.floor(Date.now() / 1000);
  const payload: Pick<JwtPayload, "iss" | "sub" | "iat" | "exp"> = {
    iss: "pipeline-app",
    sub: userID,
    iat,
    exp: iat + expiresIn
  };
  return jwt.sign(payload, secret);
}

export function getBearerToken(req: Request): string {
  const authHeader = req.get("Authorization");
  if (!authHeader) throw new Error("Missing Authorization header");
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) throw new Error("Invalid Authorization header format");
  return token;
}
export function validateJWT(token: string, secret: string): string {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded.sub) {
      throw new Error("Invalid token: no subject");
    }

    return decoded.sub; 
  } catch {
    throw new Error("Invalid token");
  }
}