import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1713608669385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "product_category"' + ' ADD COLUMN "image" text'
          )
      
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        'ALTER TABLE "product_category" DROP COLUMN "image"'
    }

}
