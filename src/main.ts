import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173'
    ], // endereço do Next
    credentials: true,
  });

  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
