import { NestFactory } from '@nestjs/core';
import serverless from 'serverless-http';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';

let cachedServer: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'https://psicoagenda.app',
            'https://www.psicoagenda.app',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
    });

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
    return serverless(app.getHttpAdapter().getInstance());
}

export const handler = async (event, context) => {
    if (!cachedServer) {
        cachedServer = await bootstrap();
    }
    return cachedServer(event, context);
};
