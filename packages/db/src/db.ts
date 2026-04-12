import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "@repo/db/src/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL environment variable is required (Supabase PostgreSQL connection string)");
}

/** Postgres client with drizzle + supabase connection string */
const client = postgres(connectionString, {
	prepare: false,
	ssl: "prefer",
});

/** Drizzle ORM instance */
export const db = drizzle(client, { schema });
export type DbClient = typeof db;
