import { MigrationInterface, QueryRunner } from "typeorm";

export class Homepge1713355590620 implements MigrationInterface {
    name = 'Homepge1713355590620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "home_page" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_3e399fbe60cfb6b8cd1e934706f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "home_page"`);
    }

}
