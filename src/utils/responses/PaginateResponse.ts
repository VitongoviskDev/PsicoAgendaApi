import { PaginationMeta } from "@/utils/pagination/PaginationMeta";
import { ApiResponse } from "@/utils/responses/ApiResponse";

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}
