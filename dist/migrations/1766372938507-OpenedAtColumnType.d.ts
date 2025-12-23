import { MigrationInterface, QueryRunner } from "typeorm";
export declare class OpenedAtColumnType1766372938507 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
