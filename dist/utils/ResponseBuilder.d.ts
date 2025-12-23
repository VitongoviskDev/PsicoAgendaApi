import { PaginationMeta } from "../pagination/PaginationMeta";
import { ApiResponse } from "../responses/ApiResponse";
import { PaginatedResponse } from "../responses/PaginateResponse";
export declare class ResponseBuilder {
    static success<T>(message: string, data?: T, status?: number): ApiResponse<T>;
    static error(message: string, error: any, status?: number): ApiResponse;
    static paginated<T>(message: string, data: T[], meta: PaginationMeta, status?: number): PaginatedResponse<T>;
}
