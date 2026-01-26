import 'dotenv/config';
import { join } from 'path';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isProd = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: isProd ?
        { rejectUnauthorized: false } :
        false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, '**', '*.entity.{js,ts}')],
    migrations: [join(__dirname, 'database', 'migrations', '*.{js,ts}')],
};

export const AppDataSource = new DataSource(dataSourceOptions);
