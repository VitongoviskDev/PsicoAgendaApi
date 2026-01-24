// src/common/exceptions/form-validation.exception.ts
import { BadRequestException } from '@nestjs/common';

export interface FieldError {
    field: string;
    error: string;
}

export class FormValidationException extends BadRequestException {
    constructor(errors: FieldError[]) {
        super({
            message: 'Erro de invalidez',
            errors,
        });
    }
}
