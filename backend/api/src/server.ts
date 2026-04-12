import Fastify from "fastify";

export const app = Fastify({
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
});

app.get("/health", async () => {
	return { ok: true };
});
