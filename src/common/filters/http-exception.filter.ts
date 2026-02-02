import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/utils/responses/ApiResponse';
import { FieldError, FormValidationException } from '../exceptions/form-validation.exception';
import { stat } from 'fs';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        // Pegamos a "payload" original
        const res = exception.getResponse();

        if (exception instanceof FormValidationException) {

            const payload = res as FormValidationExceptionPayload;
            return response.status(status).json({
                message: payload.message,
                errors: payload.errors,
                status: status
            } as ApiResponse);

        } else if (typeof res === 'object') {
            const payload = res as DefaultExceptioPayload;
            return response.status(status).json({
                message: payload.message ?? "Erro inesperado",
                error: payload.data ?? null,
                status: status
            } as ApiResponse);

        } else if (typeof res === 'string') {
            return response.status(status).json({
                message: res,
                status: status
            } as ApiResponse);
        }
    }
}

export interface FormValidationExceptionPayload {
    message: string;
    errors: FieldError[];
}
export interface DefaultExceptioPayload {
    message: string;
    data?: any;
}