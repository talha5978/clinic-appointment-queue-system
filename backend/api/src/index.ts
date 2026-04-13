import Fastify from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { server } from "~/server";

const app = Fastify({
	logger: {
		level: "info",
		base: null,
		timestamp: () => `,"time":"${new Date().toISOString()}"`,
		messageKey: "message",
		formatters: {
			level(label) {
				return { level: label };
			},
		},
		serializers: {
			req(req) {
				return {
					method: req.method,
					url: req.url,
				};
			},
			res(res) {
				return {
					statusCode: res.statusCode,
				};
			},
		},
	},
	disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>();

const startServer = async () => {
	try {
		await server(app);
		const port = app.config.BACKEND_PORT;

		await app.listen({ port: Number(port), host: "0.0.0.0" }, (err, address) => {
			if (err) {
				app.log.error(err);
				process.exit(1);
			}

			console.log(`Server running at ${address}`);
		});
	} catch (error) {
		app.log.error(error);
		process.exit(1);
	}
};

startServer();
