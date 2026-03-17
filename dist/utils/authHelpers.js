import argon2 from "argon2";
import jwt from "jsonwebtoken";
export async function hashPassword(password) {
    return argon2.hash(password);
}
export async function checkPasswordHash(password, hash) {
    return argon2.verify(hash, password);
}
export function makeJWT(userID, expiresIn, secret) {
    const iat = Math.floor(Date.now() / 1000);
    const payload = {
        iss: "pipeline-app",
        sub: userID,
        iat,
        exp: iat + expiresIn
    };
    return jwt.sign(payload, secret);
}
export function getBearerToken(req) {
    const authHeader = req.get("Authorization");
    if (!authHeader)
        throw new Error("Missing Authorization header");
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token)
        throw new Error("Invalid Authorization header format");
    return token;
}
