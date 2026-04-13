export class AppError extends Error {
	statusCode: number;
	code: string;
	details?: any;

	constructor(message: string, statusCode = 400, code = "BAD_REQUEST", details?: any) {
		super(message);
		this.name = "AppError";
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
	}
}
