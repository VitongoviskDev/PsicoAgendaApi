import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixClinicDescription1766368545291 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
