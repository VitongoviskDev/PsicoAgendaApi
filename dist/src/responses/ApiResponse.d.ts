export interface ApiResponse<T = any> {
    message: string;
    data?: T;
    error?: any;
    status: number;
}
