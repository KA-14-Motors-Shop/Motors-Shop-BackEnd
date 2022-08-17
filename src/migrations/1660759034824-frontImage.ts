import { MigrationInterface, QueryRunner } from "typeorm";

export class frontImage1660759034824 implements MigrationInterface {
    name = 'frontImage1660759034824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "is_front" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "is_front"`);
    }

}
