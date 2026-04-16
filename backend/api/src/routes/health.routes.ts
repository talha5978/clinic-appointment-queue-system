import type { FastifyPluginAsync } from "fastify";

const healthRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.get("/", async (_, reply) => {
		try {
			const result = await fastify.db.execute("SELECT timestamp 'now' AS now");
			return reply.success(
				{
					status: "ok",
					dbConnected: true,
					timestamp: result[0].now ?? null,
				},
				"Health check successful",
				200,
			);
		} catch (err) {
			throw err;
		}
	});
};

export default healthRoutes;
