import type { DbClient } from "@repo/db/db.ts";

declare module "fastify" {
	interface AppConfig {
		DATABASE_URL: string;
		BACKEND_PORT: number;
		NODE_ENV: "development" | "production" | "test";
	}

	interface FastifyInstance {
		db: DbClient;
		config: AppConfig;
	}
}
