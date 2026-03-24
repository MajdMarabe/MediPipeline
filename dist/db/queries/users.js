import { db } from '../index.js';
import { users } from '../schema.js';
import { eq } from 'drizzle-orm';
export async function createUser(user) {
    const [result] = await db
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning();
    return result;
}
export async function getUserByEmail(email) {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    return result.length > 0 ? result[0] : null;
}
export async function getUserById(userId) {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
    return result.length > 0 ? result[0] : null;
}
export async function deleteAllUsers() {
    await db.delete(users);
}
