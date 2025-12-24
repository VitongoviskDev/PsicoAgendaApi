export interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    next_page?: number | null;
    prev_page?: number | null;
    next_page_url?: string | null;
    prev_page_url?: string | null;
}
