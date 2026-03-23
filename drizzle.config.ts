import { defineConfig } from 'drizzle-kit';

process.loadEnvFile();

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DB_URL ||
      'postgres://postgres:0000@localhost:5432/medi1?sslmode=disable',
  },
});
