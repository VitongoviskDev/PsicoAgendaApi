import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLastClinicIdToUserYYYYMMDDHHMMSS implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'lastClinicId',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.query(`CREATE INDEX "IDX_users_lastClinicId" ON "users" ("lastClinicId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_users_lastClinicId"`);
    await queryRunner.dropColumn('users', 'lastClinicId');
  }
}
