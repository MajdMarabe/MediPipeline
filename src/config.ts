import type { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();

function envOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value;
}

type APIConfig = {
  fileserverHits: number;
    platform: string;
  polkaKey: string;

};

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./drizzle",
};
export const config = {
  api: {
    fileserverHits: 0,
    platform: envOrThrow("PLATFORM")
    ,polkaKey: envOrThrow("POLKA_KEY")

  } as APIConfig,

  db: {
    url: envOrThrow("DB_URL"),
    migrationConfig,
  } as DBConfig,
   auth: {
    JWT_SECRET: envOrThrow("JWT_SECRET"),
  },
};