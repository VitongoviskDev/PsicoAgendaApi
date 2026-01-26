import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { GlobalHttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { ValidationError } from 'class-validator';
import { FormValidationException } from './common/exceptions/form-validation.exception';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? [
      'http://localhost:5173',
    ],
    credentials: true,
  });

  app.useGlobalFilters(
    new GlobalHttpExceptionFilter()
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,

    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors.flatMap(error => {
        if (!error.constraints) return [];

        return Object.values(error.constraints).map(msg => ({
          field: error.property,
          error: msg,
        }));
      });

      return new FormValidationException(formattedErrors);
    }
  }));

await app.listen(process.env.PORT || 3000);
}
bootstrap();