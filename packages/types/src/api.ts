export type SuccessResponse<T = any> = {
	success: true;
	data: T;
	message?: string;
};
