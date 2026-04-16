import * as db from "@repo/db/types.js";
import type { SuccessResponse } from "@repo/types/src/api";

export type GetHighLevelDoctors = SuccessResponse<{
	doctors: db.Doctor[];
	total: number;
	pageIndex: number;
	pageSize: number;
	totalPages: number;
}>;
