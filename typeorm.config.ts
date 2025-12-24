// typeorm.config.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/data-source';

export default new DataSource(dataSourceOptions);