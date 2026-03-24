process.loadEnvFile();
function envOrThrow(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing env variable: ${key}`);
    }
    return value;
}
const migrationConfig = {
    migrationsFolder: './drizzle',
};
export const config = {
    api: {
        fileserverHits: 0,
        platform: envOrThrow('PLATFORM'),
        polkaKey: envOrThrow('POLKA_KEY'),
    },
    db: {
        url: envOrThrow('DB_URL'),
        migrationConfig,
    },
    auth: {
        JWT_SECRET: envOrThrow('JWT_SECRET'),
    },
};
