import {
    ProductService,
    type SubscriberConfig,
    type SubscriberArgs,
} from "@medusajs/medusa";

export default async function productUpdateHandler({
    data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, any>>) {
    const productService: ProductService = container.resolve("productService");
    const { id } = data;
    const product = await productService.retrieve(id);
    
    // Process the product metadata if it contains 'evariants'
    if (product.metadata?.evariants) {
          // @ts-ignore
        const evariantIds = product.metadata?.evariants.map((variant: { id: string }) => variant.id);
        
        // Update each evariant product
        await Promise.all(evariantIds.map(async (variantId: string) => {
            const evariantProduct = await productService.retrieve(variantId);
            await productService.update(evariantProduct.id, {
                metadata: {
                    parent: product.id
                }
            });
        }));
    }
}

export const config: SubscriberConfig = {
    event: "product.updated",
    context: {
        subscriberId: "product-update-handler",
    },
};
