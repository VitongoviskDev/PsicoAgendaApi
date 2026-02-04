import 'dotenv/config';
import 'tsconfig-paths/register';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

export const AppDataSource = new DataSource({
    ...dataSourceOptions,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
});
