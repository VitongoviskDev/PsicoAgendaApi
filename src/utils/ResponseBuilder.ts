import { PaginationMeta } from "../pagination/PaginationMeta";
import { ApiResponse } from "../responses/ApiResponse";
import { PaginatedResponse } from "../responses/PaginateResponse";

export class ResponseBuilder {
    static success<T>(message: string, data?: T, status = 200): ApiResponse<T> {
        return { message, data, status };
    }

    static error(message: string, error: any, status = 400): ApiResponse {
        return { message, error, status };
    }

    static paginated<T>(
        message: string,
        data: T[],
        meta: PaginationMeta,
        status = 200
    ): PaginatedResponse<T> {
        return { message, data, status, pagination: meta };
    }
}
