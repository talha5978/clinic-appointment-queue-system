import { FastifyPluginAsync } from "fastify";
import { doctors } from "@repo/db/schema.js";
import { ilike, desc, and, sql } from "drizzle-orm";
import type { GetHighLevelDoctors } from "@repo/types/doctors.js";

const doctorsRoutes: FastifyPluginAsync = async (fastify, _options) => {
	fastify.get("/doctors-list", async (request, reply): Promise<GetHighLevelDoctors> => {
		const {
			search = "",
			pageIndex = "0",
			pageSize = "10",
		} = request.query as {
			search?: string;
			pageIndex?: string;
			pageSize?: string;
		};

		const page = Math.max(0, parseInt(pageIndex));
		const limit = Math.min(100, parseInt(pageSize));
		const offset = page * limit;

		let whereCondition = and();

		if (search.trim()) {
			whereCondition = and(whereCondition, ilike(doctors.name, `%${search}%`));
		}

		const [{ count }] = await fastify.db
			.select({ count: sql<number>`count(*)` })
			.from(doctors)

			.where(whereCondition);

		const allDoctors = await fastify.db
			.select()
			.from(doctors)
			.where(whereCondition)
			.orderBy(desc(doctors.createdAt), doctors.name) // better default sorting
			.limit(limit)
			.offset(offset);

		return reply.success(
			{
				doctors: allDoctors,
				total: Number(count),
				pageIndex: page,
				pageSize: limit,
				totalPages: Math.ceil(Number(count) / limit),
			},
			"Doctors fetched successfully",
		);
	});
};

export default doctorsRoutes;
