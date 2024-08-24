import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/medusa"
import { HomePage } from "./../../../models/home_page"
// import { ProductCategory } from "./../../../models/product-category"
import { EntityManager } from "typeorm"
import {
    Order
} from "@medusajs/medusa"
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for other ports
    auth: {
        user: "contact@cradial.in",
        pass: "MaryS@1587",
    },
});

// export const GET = async (
//     req: MedusaRequest,
//     res: MedusaResponse
// ) => {
//     const manager: EntityManager = req.scope.resolve("manager")
//     const postRepo = manager.getRepository(HomePage)
//     // console.log("ok")
//     return res.json({
//         posts: await postRepo.find(),
//     })
//     // return res.json({
//     //     posts: "ok"
//     // })
// }


export const POST = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const manager: EntityManager = req.scope.resolve("manager")
    const postRepo = manager.getRepository(Order)
    // console.log("ok")

    const id = req.body.id
    const value = req.body.status
    const n = await postRepo.findOne({
        where: {
            id: id,
        }

    })
    var result = null
    if (n != null) {
        // update
        result = await postRepo.update(id, {
            status: value
        })
    } else {
        result = "error"
    }
    console.log(result)
    try {


        if (value == "packed") {
            const info = await transporter.sendMail({
                from: '"Order Confirmation" <contact@cradial.in>', // sender address
                to: n.email, // list of receivers
                subject: `Your Order #${n.display_id} is Packed`, // Subject line
                text: `Hello,
            
            Thank you for your order!
            
            We are excited to let you know that your order #${n.display_id} has been packed and is ready to be shipped. You will receive another notification once your order has been dispatched.
            
            If you have any questions or need further assistance, feel free to contact us.
            
            Thanks,
            The Cradial Team`, // plain text body
                html: `<p>Hello,</p>
                       <p>Thank you for your order!</p>
                       <p>We are excited to let you know that your order #${n.display_id} has been packed and is ready to be shipped. You will receive another notification once your order has been dispatched.</p>
                       <p>If you have any questions or need further assistance, feel free to contact us.</p>
                       <p>Thanks,<br>The Cradial Team</p>`, // html body
            });

        } else if (value == "shipped") {

            const info = await transporter.sendMail({
                from: '"Order Confirmation" <contact@cradial.in>', // sender address
                to: n.email, // list of receivers
                subject: `Your Order #${n.display_id} is Shipped`, // Subject line
                text: `Hello,
            
            Good news! Your order #${n.display_id} has been shipped and is on its way to you. You will receive another notification once your order is out for delivery.
            
            If you have any questions or need further assistance, feel free to contact us.
            
            Thanks,
            The Cradial Team`, // plain text body
                html: `<p>Hello,</p>
                       <p>Good news! Your order #${n.display_id} has been shipped and is on its way to you. You will receive another notification once your order is out for delivery.</p>
                       <p>If you have any questions or need further assistance, feel free to contact us.</p>
                       <p>Thanks,<br>The Cradial Team</p>`, // html body
            });
            

        } else if (value == "out for delivery") {

            const info = await transporter.sendMail({
                from: '"Order Confirmation" <contact@cradial.in>', // sender address
                to: n.email, // list of receivers
                subject: `Your Order #${n.display_id} is Out for Delivery`, // Subject line
                text: `Hello,
            
            Your order #${n.display_id} is out for delivery and will reach you soon. Please be available to receive your package.
            
            If you have any questions or need further assistance, feel free to contact us.
            
            Thanks,
            The Cradial Team`, // plain text body
                html: `<p>Hello,</p>
                       <p>Your order #${n.display_id} is out for delivery and will reach you soon. Please be available to receive your package.</p>
                       <p>If you have any questions or need further assistance, feel free to contact us.</p>
                       <p>Thanks,<br>The Cradial Team</p>`, // html body
            });
            


         }
        else if (value == "completed") {

            const info = await transporter.sendMail({
                from: '"Order Confirmation" <contact@cradial.in>', // sender address
                to: n.email, // list of receivers
                subject: `Your Order #${n.display_id} is Completed`, // Subject line
                text: `Hello,
            
            We are pleased to inform you that your order #${n.display_id} has been successfully delivered and completed. We hope you enjoy your purchase!
            
            If you have any questions or need further assistance, feel free to contact us.
            
            Thanks,
            The Cradial Team`, // plain text body
                html: `<p>Hello,</p>
                       <p>We are pleased to inform you that your order #${n.display_id} has been successfully delivered and completed. We hope you enjoy your purchase!</p>
                       <p>If you have any questions or need further assistance, feel free to contact us.</p>
                       <p>Thanks,<br>The Cradial Team</p>`, // html body
            });
            
        }


        // console.log("Message sent: %s", info.messageId);



    } catch (error) {
        console.error("Error processing order:", error);
    }


    return res.json({
        data: result

    })
    // return res.json({
    //     posts: "ok"
    // })
}