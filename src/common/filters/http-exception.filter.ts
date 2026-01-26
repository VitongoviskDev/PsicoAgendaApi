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

        if (exception instanceof ForbiddenException) {

            const payload = res as ForbiddenExceptionPayload;
            return response.status(status).json({
                message: payload.message ?? "Acesso negado",
                error: payload.data ?? null,
                status: 403
            } as ApiResponse);

        } else if (exception instanceof UnauthorizedException) {

            return response.status(status).json({
                message: "Credenciais inválidas",
                error: res,
            } as ApiResponse);

        } else if (exception instanceof FormValidationException) {

            const payload = res as FormValidationExceptionPayload;
            return response.status(status).json({
                message: payload.message,
                errors: payload.errors,
                status: 422
            } as ApiResponse);

        } else if (typeof res === 'string') {

            return response.status(status).json({
                message: res,
                status
            } as ApiResponse);

        } else if (typeof res === 'object') {

            return response.status(status).json({
                message: "Erro inesperado",
                error: res,
                status
            } as ApiResponse);

        }
    }
}

export interface ForbiddenExceptionPayload {
    message: string;
    data?: any;
}
export interface FormValidationExceptionPayload {
    message: string;
    errors: FieldError[];
}