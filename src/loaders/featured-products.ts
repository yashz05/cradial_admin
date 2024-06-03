export default async function () {
  const store = (await import(
    "@medusajs/medusa/dist/api/routes/store/products/index"
  )) as any
  const admin = (await import(
    "@medusajs/medusa/dist/api/routes/admin/products/index"
  )) as any
  store.allowedStoreProductsFields = [
    ...store.allowedStoreProductsFields,
    "featured"
  ]
  store.defaultStoreProductsFields = [
    ...store.defaultStoreProductsFields,
    "featured"
  ]

  admin.defaultAdminProductFields = [
    ...admin.defaultAdminProductFields,
    "featured"
  ]
}