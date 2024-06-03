import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717320988479 implements MigrationInterface {
    name = 'Migrations1717320988479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "charms_parent_cat" ("id" SERIAL NOT NULL, "name" character varying, "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_db4e81b45007df67130f3a0d351" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" DROP COLUMN "qty"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" ADD "qty" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "charms_parent_cat"`);
    }

}
