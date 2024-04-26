import { registerOverriddenValidators } from '@medusajs/medusa';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from '@medusajs/medusa/dist/api/routes/admin/product-categories'
import { AdminPostProductsProductVariantsVariantReq as MedusaAdminPostProductsProductVariantsVariantReq } from '@medusajs/medusa/dist/api/routes/admin/products/update-variant';

class AdminPostProductsProductCategoriesCategoryReq extends MedusaAdminPostProductCategoriesCategoryReq {

    @IsOptional()
    image?: string;


}


registerOverriddenValidators(AdminPostProductsProductCategoriesCategoryReq);



class AdminPostProductsProductVariantsVariantReq extends MedusaAdminPostProductsProductVariantsVariantReq {
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsString()
    @IsOptional()
    thumbnail?: string;
}

registerOverriddenValidators(AdminPostProductsProductVariantsVariantReq);