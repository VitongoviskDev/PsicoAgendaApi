import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '@/utils/responses/ApiResponse';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Se for erro HTTP padrão do Nest
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res: any = exception.getResponse();

            const message =
                typeof res === 'string' ? res : res?.message || 'Erro inesperado';

            return response.status(status).json(
                {
                    message,
                    error: res,
                } as ApiResponse
            );
        }

        // Erro desconhecido (não HttpException)
        console.error('Unhandled exception:', exception);

        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    message: 'Erro interno do servidor',
                    error: exception?.message || exception,
                } as ApiResponse
            );
    }
}
