import { PaginationMeta } from "../pagination/PaginationMeta";
import { ApiResponse } from "./ApiResponse";
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
    pagination: PaginationMeta;
}
