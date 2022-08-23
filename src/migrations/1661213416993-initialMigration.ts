import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1661213416993 implements MigrationInterface {
    name = 'initialMigration1661213416993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "is_front" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "is_front"`);
    }

}
