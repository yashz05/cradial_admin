import { MigrationInterface, QueryRunner } from "typeorm";

export class FeaturedProduct1717183609178 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "product" ADD COLUMN "featured" boolean DEFAULT false`
        );
        await queryRunner.query(
            `ALTER TABLE "product" ADD COLUMN "best_seller" boolean DEFAULT false`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "product" DROP COLUMN "featured"`
        );
        await queryRunner.query(
            `ALTER TABLE "product" DROP COLUMN "best_seller"`
        );
    }

}