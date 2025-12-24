import 'dotenv/config';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [
        isProd ?
            'dist/**/*.entity.js' :
            'src/**/*.entity.ts'
    ],
    migrations: [
        isProd ?
            'dist/migrations/*.js' :
            'src/migrations/*.ts'
    ]
};

export const AppDataSource = new DataSource(dataSourceOptions);
