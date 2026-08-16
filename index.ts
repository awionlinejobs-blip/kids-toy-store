import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Load environment variables from .env when not already provided by the runtime
// (e.g. `npm run dev`, `tsx`, or the seed script). In production the platform
// injects DATABASE_URL directly. dotenv never overwrites existing env vars.
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { config } = require("dotenv");
  config();
}

type DbClient = NodePgDatabase;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: DbClient;
};

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your database connection string as the DATABASE_URL environment variable.",
    );
  }
  return url;
}

function createPool(): Pool {
  const databaseUrl = getDatabaseUrl();
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("neon.tech")
      ? { rejectUnauthorized: false }
      : undefined,
  });
  return pool;
}

function getPool(): Pool {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = createPool();
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDb(): DbClient {
  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = drizzle(getPool());
  }
  return globalForDb.__arenaNextJsPostgresqlDb;
}

// Lazily-initialized database client. The connection is only established (and
// DATABASE_URL only validated) when a query is actually executed — this keeps
// `next build` from requiring a live database during static page generation.
export const db = new Proxy<DbClient>({} as DbClient, {
  get(_target, prop: keyof DbClient) {
    const real = getDb();
    const value = real[prop];
    return typeof value === "function" ? value.bind(real) : value;
  },
});

// Directly-accessible pool for scripts that need to call pool.end() (i.e. seeding).
export function getPoolForScripts(): Pool {
  return getPool();
}

export { getDatabaseUrl };
