import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import fp from "fastify-plugin";
import { AppError } from "~/lib/errors";

class ErrorHandlerPlugin {
	async register(fastify: FastifyInstance) {
		// Global error handler
		fastify.setErrorHandler(async (error: any, request: FastifyRequest, reply: FastifyReply) => {
			let statusCode = error.statusCode || 500;
			let errorCode = "INTERNAL_SERVER_ERROR";
			let message = "Something went wrong";
			let details: any = null;

			if (error instanceof ZodError) {
				statusCode = 400;
				errorCode = "VALIDATION_ERROR";
				message = "Validation failed";
				details = error.issues.map((err) => ({
					field: err.path.join("."),
					message: err.message,
				}));
			} else if (error instanceof AppError || error.name === "AppError") {
				statusCode = error.statusCode || 400;
				errorCode = error.code || "BAD_REQUEST";
				message = error.message;
				details = error.details || null;
			} else if (error.code === "23505") {
				statusCode = 409;
				errorCode = "CONFLICT";
				message = "Resource already exists";
			}

			request.log.error(error);

			return reply.status(statusCode).send({
				success: false,
				error: {
					code: errorCode,
					message,
					details,
				},
			});
		});

		// Decorate reply with .success() method
		fastify.decorateReply(
			"success",
			function (this: FastifyReply, data: any, message?: string, statusCode = 200) {
				return this.status(statusCode).send({
					success: true,
					data,
					message: message || undefined,
				});
			},
		);
	}
}

const errorHandlerInternal = async (fastify: FastifyInstance) => {
	const pluginInstance = new ErrorHandlerPlugin();
	await pluginInstance.register(fastify);
};

export default fp(errorHandlerInternal, {
	name: "error-handler-plugin",
});
