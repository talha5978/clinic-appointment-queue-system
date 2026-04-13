import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { connectDB } from "@repo/db/db.js";

const dbPluginInternal: FastifyPluginAsync = async (fastify) => {
	const { db, client } = await connectDB(fastify);

	fastify.decorate("db", db);

	fastify.addHook("onReady", async () => {
		console.log("✅ Connected to Supabase PostgreSQL successfully at " + new Date().toISOString());
	});

	fastify.addHook("onClose", async () => {
		console.log("Closing database connection...");
		await client.end();
	});
};

export default fp(dbPluginInternal, {
	dependencies: ["@fastify/env"],
	name: "db-plugin",
});
