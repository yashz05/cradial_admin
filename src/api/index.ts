import { registerOverriddenValidators } from '@medusajs/medusa';
import {IsArray, IsOptional, IsString} from 'class-validator';
import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from '@medusajs/medusa/dist/api/routes/admin/product-categories'

class AdminPostProductsProductCategoriesCategoryReq extends MedusaAdminPostProductCategoriesCategoryReq {
  
    @IsOptional()
    image?: string;

   
}

registerOverriddenValidators(AdminPostProductsProductCategoriesCategoryReq);