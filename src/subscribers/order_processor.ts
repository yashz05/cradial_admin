import {
    OrderService,
    SubscriberArgs,
    SubscriberConfig,
} from "@medusajs/medusa";
import nodemailer from "nodemailer";
import axios from "axios";

type OrderPlacedEvent = {
    id: string;
    no_notification: boolean;
};

const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for other ports
    auth: {
        user: "contact@cradial.in",
        pass: "MaryS@1587",
    },
});

export default async function orderPlacedHandler({
    data,
    eventName,
    container,
}: SubscriberArgs<OrderPlacedEvent>) {
    const orderService: OrderService = container.resolve("orderService");
    console.log("Processing order", data.id);
    try {
        const order = await orderService.retrieve(data.id, {
            relations: ["items", "items.variant", "items.variant.product"],
        });
        console.log(order);
        console.log("Order retrieved");

        const products = order.items.map(item => `
            - Product: ${item.title}
              Quantity: ${item.quantity}
              Price: ₹${(item.unit_price / 100).toFixed(2)}
        `).join('\n');

        const htmlProducts = order.items.map(item => `
            <li><strong>Product:</strong> ${item.title}<br>
                <strong>Quantity:</strong> ${item.quantity}<br>
                <strong>Price:</strong> ₹${(item.unit_price / 100).toFixed(2)}</li>
        `).join('');

        const info = await transporter.sendMail({
            from: '"Order Confirmation" <contact@cradial.in>', // sender address
            to: order.email, // list of receivers
            subject: `Your Order #${order.display_id} is Being Processed`, // Subject line
            text: `Hello,

Thank you for your order!

We have received your order #${order.display_id} and are currently processing it. You will receive another notification once your order has been shipped.

Order Details:
${products}

If you have any questions or need further assistance, feel free to contact us.

Thanks,
The Cradial Team`, // plain text body
            html: `<p>Hello,</p>
                   <p>Thank you for your order!</p>
                   <p>We have received your order #${order.display_id} and are currently processing it. You will receive another notification once your order has been shipped.</p>
                   <p><strong>Order Details:</strong></p>
                   <ul>
                     ${htmlProducts}
                   </ul>
                   <p>If you have any questions or need further assistance, feel free to contact us.</p>
                   <p>Thanks,<br>The Cradial Team</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        // Reduce charm quantities for items that have charms
        for (const item of order.items) {
            if (item.metadata && item.metadata.charms) {
                // @ts-ignore
                for (const charm of item.metadata.charms) {
                    console.log(charm);

                    const options = {
                        method: 'POST',
                        url: 'http://localhost:9000/admin/charms/list/reduce',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-medusa-access-token': 'pk_01HYXJRC7R1M64WMHYJK6CJ9ME',
                        },
                        data: { name: charm.name }
                    };

                    try {
                         // @ts-ignore
                        const response = await axios.request(options);
                        console.log(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error processing order:", error);
    }
    console.log("Order processed");
}

export const config: SubscriberConfig = {
    event: OrderService.Events.PLACED,
};
