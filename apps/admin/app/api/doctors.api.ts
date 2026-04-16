import type { GetHighLevelDoctors } from "@repo/types/doctors.js";
import { apiFetch } from "~/utils/apiFetch";

export const doctorsApi = {
	getHighLevelDoctors: async (
		params: {
			search?: string;
			pageIndex?: number;
			pageSize?: number;
		} = {},
	): Promise<GetHighLevelDoctors> => {
		const query = new URLSearchParams();
		if (params.search) query.set("search", params.search);
		if (params.pageIndex !== undefined) query.set("pageIndex", params.pageIndex.toString());
		if (params.pageSize !== undefined) query.set("pageSize", params.pageSize.toString());
		return apiFetch<GetHighLevelDoctors>(`doctors/doctors-list?${query}`);
	},
} as const;
