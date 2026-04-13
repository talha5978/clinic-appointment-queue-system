import type { FastifyInstance } from "fastify";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

export async function zodPlugin(fastify: FastifyInstance) {
	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);
}
