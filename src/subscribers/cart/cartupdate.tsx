import {
    CartService,
    type SubscriberConfig,
    type SubscriberArgs,
} from "@medusajs/medusa"



export default async function useCartUpdate({
    data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  
    const productService: CartService = container.resolve("cartService");
    const { id } = data;
    const product = await productService.retrieve(id);
 
    // console.log("info");

    // TODO: handle event
}




export const config: SubscriberConfig = {
    event: "cart.updated",
    context: {
        subscriberId: "cart.updated",
    },
};

// export default userPasswordResetSubscriber;