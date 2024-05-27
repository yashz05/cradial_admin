import {
    ProductService,
    type SubscriberConfig,
    type SubscriberArgs,
} from "@medusajs/medusa"

class OrderNotifierSubscriber {
    constructor({ eventBusService }) {
        eventBusService.subscribe("product.updated", this.handleOrder);
    }

    handleOrder = async (data) => {
        // var product = ProductService.retrieve(data.id);
    };
}

export default OrderNotifierSubscriber;