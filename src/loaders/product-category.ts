export default async function () {
    const adminCategoriesImports = (await import(
        '@medusajs/medusa/dist/api/routes/admin/product-categories/index'
    )) as any;

    const storeCategoriesImports = (await import(
        '@medusajs/medusa/dist/api/routes/store/product-categories/index'
    )) as any;

    adminCategoriesImports.defaultProductCategoryFields = [
        ...adminCategoriesImports.defaultProductCategoryFields,
        'image',
    ];

    storeCategoriesImports.defaultStoreProductCategoryFields = [
        ...storeCategoriesImports.defaultStoreProductCategoryFields,
        'image',
    ];

    storeCategoriesImports.allowedStoreProductCategoryFields = [
        ...storeCategoriesImports.allowedStoreProductCategoryFields,
        'image',
    ];
}