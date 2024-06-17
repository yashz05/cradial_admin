import { MigrationInterface, QueryRunner } from "typeorm";

export class PhoneThread1718649448029 implements MigrationInterface {
    name = 'PhoneThread1718649448029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "phone_thread" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "thread_name" character varying NOT NULL, "thread_color" character varying NOT NULL, "thread_qty" character varying NOT NULL, "thread_img" character varying NOT NULL, CONSTRAINT "PK_d5c81fcca0c2ff4cf6a90afb0d2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "phone_thread"`);
    }

}
