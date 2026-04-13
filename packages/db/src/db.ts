import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schema";

export function connectDB(fastify: any) {
	const connectionString = fastify.config.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL environment variable is required");
	}

	const client = postgres(connectionString, {
		prepare: false,
		ssl: "prefer",
	});

	const db = drizzle(client, { schema });
	return { db, client };
}

export type DbClient = PostgresJsDatabase<typeof schema>;
