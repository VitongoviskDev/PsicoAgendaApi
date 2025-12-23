import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FixClinicDescription1766368400349 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
