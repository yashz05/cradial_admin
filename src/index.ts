export default async function () {
  const adminVariantsImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/variants/index'
  )) as any;

  const storeVariantsImports = (await import(
    '@medusajs/medusa/dist/api/routes/store/variants/index'
  )) as any;

  adminVariantsImports.defaultAdminVariantRelations = [
    ...adminVariantsImports.defaultAdminVariantRelations,
    'images',
  ];

  storeVariantsImports.defaultStoreVariantRelations = [
    ...storeVariantsImports.defaultStoreVariantRelations,
    'images',
  ];

  storeVariantsImports.allowedStoreVariantRelations = [
    ...storeVariantsImports.allowedStoreVariantRelations,
    'images',
  ];
  const imports = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any
  imports.allowedStoreProductsFields = [
    ...imports.allowedStoreProductsFields,
    "featured"
  ]
  imports.defaultStoreProductsFields = [
    ...imports.defaultStoreProductsFields,
    "featured"
  ]
}



