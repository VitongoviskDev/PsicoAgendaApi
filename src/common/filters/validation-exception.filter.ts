// src/common/filters/validation-exception.filter.ts
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        if (Array.isArray(exceptionResponse.message)) {
            const errors = exceptionResponse.message.map((err) => ({
                field: err.property,
                error: Object.values(err.constraints)[0],
            }));

            return response.status(status).json({
                message: 'Erro de validação',
                errors,
                status,
            });
        }

        return response.status(status).json(exceptionResponse);
    }
}
