// src/utils/errors/ValidationErrorResponse.ts
export interface FieldError {
    field: string;
    error: string;
}

export interface ValidationErrorResponse {
    message: string;
    errors: FieldError[];
}
