import { MigrationInterface, QueryRunner } from "typeorm";

export class Charms1717304534413 implements MigrationInterface {
    name = 'Charms1717304534413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "charms_list" ("id" SERIAL NOT NULL, "name" character varying, "image" character varying NOT NULL, "qty" integer NOT NULL DEFAULT '0', "active" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4fa1126e6468c877a9b63ae8af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" DROP COLUMN "qty"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" ADD "qty" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "charms_sub_cat" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "charms_list"`);
    }

}
