import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NullableOpenedAt1766370759696 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
