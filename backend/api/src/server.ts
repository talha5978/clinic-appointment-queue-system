import type { FastifyInstance } from "fastify";
import { zodPlugin } from "./plugins/zod";
import errorHandlerPlugin from "~/plugins/error-handler";
import dbPlugin from "~/plugins/db";
import fastifyEnv from "@fastify/env";
import path from "path";
import { fileURLToPath } from "node:url";
import { options } from "~/utils/envPluginOptions";
import doctorsRoutes from "~/routes/doctors.routes";
import healthRoutes from "~/routes/health.routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function server(fastify: FastifyInstance) {
	await fastify.register(fastifyEnv, options(path, __dirname));
	await fastify.register(zodPlugin);
	await fastify.register(errorHandlerPlugin);
	await fastify.register(dbPlugin);

	await fastify.register(doctorsRoutes, { prefix: "/api/doctors" });
	await fastify.register(healthRoutes, { prefix: "/api/health" })
}
