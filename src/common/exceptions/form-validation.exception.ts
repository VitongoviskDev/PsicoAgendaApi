// src/common/exceptions/form-validation.exception.ts
import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { stat } from 'fs';

export interface FieldError {
    field: string;
    error: string;
}

export class FormValidationException extends UnprocessableEntityException {
    constructor(errors: FieldError[]) {
        super({
            message: 'Validation failed',
            errors,
        });
    }
}
