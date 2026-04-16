import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import fp from "fastify-plugin";
import { ApiError } from "~/utils/ApiError";
import type { SuccessResponse } from "@repo/types/api.js";

class ErrorHandlerPlugin {
	async register(fastify: FastifyInstance) {
		// Global error handler
		fastify.setErrorHandler(async (error: any, request: FastifyRequest, reply: FastifyReply) => {
			let statusCode = 500;
			let errorCode = "INTERNAL_SERVER_ERROR";
			let message = "Something went wrong";
			let details: any = null;

			if (error instanceof ZodError) {
				statusCode = 400;
				errorCode = "VALIDATION_ERROR";
				message = "Validation failed";
				details = error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				}));
			} else if (error instanceof ApiError || error.name === "ApiError") {
				statusCode = error.statusCode || 400;
				errorCode = error.code || "BAD_REQUEST";
				message = error.message;
				details = error.details || null;
			} else if (error.code === "23505") {
				// Unique violation (PostgreSQL)
				statusCode = 409;
				errorCode = "CONFLICT";
				message = "Resource already exists";
			} else if (error.code === "23503") {
				// Foreign key violation
				statusCode = 400;
				errorCode = "FOREIGN_KEY_VIOLATION";
				message = "Referenced record does not exist";
			}

			request.log.error({
				err: error,
				reqId: request.id,
				url: request.url,
				method: request.method,
			});

			return reply.status(statusCode).send({
				success: false,
				error: {
					code: errorCode,
					message,
					...(details && { details }),
				},
			});
		});

		fastify.decorateReply("success", function <
			T,
		>(this: FastifyReply, data: T, message?: string, statusCode = 200) {
			return this.status(statusCode).send({
				success: true,
				data,
				...(message && { message }),
			} as SuccessResponse<T>);
		});
	}
}

const errorHandlerInternal = async (fastify: FastifyInstance) => {
	const pluginInstance = new ErrorHandlerPlugin();
	await pluginInstance.register(fastify);
};

export default fp(errorHandlerInternal, {
	name: "error-handler-plugin",
});
