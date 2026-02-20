import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWaitingFirstSectionToProfileStatusEnum1770695000000 implements MigrationInterface {
    name = 'AddWaitingFirstSectionToProfileStatusEnum1770695000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // The enum in patient_profiles seems to be using a generic check or a specific named type.
        // Based on previous migrations, it might be "patient_profiles_status_enum" or similar if defined.
        // However, looking at the previous migration for user_status_enum, I should be careful.
        // In PostgreSQL, to add a value to an existing enum:
        await queryRunner.query(`ALTER TYPE "patient_profiles_status_enum" ADD VALUE 'WAITING_FIRST_SECTION'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.warn('Down migration for AddWaitingFirstSectionToProfileStatusEnum1770695000000 is not supported directly in Postgres.');
    }

}
