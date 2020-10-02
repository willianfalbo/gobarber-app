import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { defaultId, defaultTimestamps } from '../common-fields';

export default class AddedAppointment1595452932772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          { ...defaultId },
          {
            name: 'barber',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          ...defaultTimestamps,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
