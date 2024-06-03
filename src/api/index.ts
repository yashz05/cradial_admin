import { registerOverriddenValidators } from '@medusajs/medusa';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from '@medusajs/medusa/dist/api/routes/admin/product-categories'
import { AdminPostProductsProductVariantsVariantReq as MedusaAdminPostProductsProductVariantsVariantReq } from '@medusajs/medusa/dist/api/routes/admin/products/update-variant';
import { AdminPostProductsReq as MedusaAdminPostProductsReq, } from "@medusajs/medusa/dist/api/routes/admin/products/create-product"

import { IsBoolean } from 'class-validator';


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


class AdminPostProductsReq extends MedusaAdminPostProductsReq {
    @IsBoolean()
    @IsOptional()
    featured: boolean
    @IsBoolean()
    @IsOptional()
    best_seller: boolean
}

registerOverriddenValidators(AdminPostProductsReq)



