import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

export default {
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL! as string,
    authToken: process.env.TURSO_AUTH_TOKEN! as string,
  },
  verbose: true,
  strict: true
} satisfies Config