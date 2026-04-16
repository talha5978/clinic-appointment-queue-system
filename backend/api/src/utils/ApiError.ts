export class ApiError extends Error {
	statusCode: number;
	code: string;
	details?: any;

	constructor(message: string, statusCode: number = 400, code: string = "BAD_REQUEST", details?: any) {
		super(message);
		this.name = "ApiError";
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError);
		}
	}
}

export class NotFoundError extends ApiError {
	constructor(resource: string = "Resource", id?: string) {
		super(id ? `${resource} with ID ${id} not found` : `${resource} not found`, 404, "NOT_FOUND");
	}
}

export class ValidationError extends ApiError {
	constructor(message = "Validation failed", details?: any) {
		super(message, 400, "VALIDATION_ERROR", details);
	}
}

export class ConflictError extends ApiError {
	constructor(message = "Resource already exists") {
		super(message, 409, "CONFLICT");
	}
}

export class ForbiddenError extends ApiError {
	constructor(message = "Access forbidden") {
		super(message, 403, "FORBIDDEN");
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message = "Unauthorized") {
		super(message, 401, "UNAUTHORIZED");
	}
}
