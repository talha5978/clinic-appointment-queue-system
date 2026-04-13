import type { FastifyInstance } from "fastify";
import { zodPlugin } from "./plugins/zod";
import errorHandlerPlugin from "~/plugins/error-handler";
import dbPlugin from "~/plugins/db";
import fastifyEnv from "@fastify/env";
import path from "path";
import { fileURLToPath } from "node:url";
import { options } from "~/utils/envPluginOptions";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function server(fastify: FastifyInstance) {
	await fastify.register(fastifyEnv, options(path, __dirname));
	await fastify.register(zodPlugin);
	await fastify.register(errorHandlerPlugin);
	await fastify.register(dbPlugin);

	fastify.get("/health", async (_, reply) => {
		try {
			const result = await fastify.db.execute("SELECT 1");
			fastify.log.info("Health check successful: " + JSON.stringify(result));
			return reply.send({
				status: "ok",
				dbConnected: true,
				timestamp: result,
			});
		} catch (err) {
			fastify.log.error(err);
			throw err; // will be caught by error handler
		}
	});
}
