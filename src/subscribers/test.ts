import {
    ProductService,
    type SubscriberConfig,
    type SubscriberArgs,
} from "@medusajs/medusa"
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "contact@cradial.in",
        pass: "MaryS@1587",
    },
});



export default async function userPasswordResetSubscriber({
    data, eventName, container, pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
    console.log(data);
    console.log("info");
    const info = await transporter.sendMail({
        from: '"Password Reset" <contact@cradial.in>', // sender address
        to: data.email, // list of receivers
        subject: "Password Reset Request", // Subject line
        text: `Hello ${data.first_name} ${data.last_name} ,
    
    We received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:
    
    https://cradial.in/reset-password?token=${data.token}    
    
    Thanks,
    The Cradial Team`, // plain text body
        html: `<p>Hello,</p>
               <p>We received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:</p>
               <p><a href="https://cradial.in/reset-password?token=${data.token}">Reset Password</a></p>
               <p>Thanks,<br>The Cradial Team</p>`, // html body
    }).catch((err) => {
        console.log(err);
    });

    console.log("info");

    console.log("Message sent: %s", info.messageId);
    // TODO: handle event
}




export const config: SubscriberConfig = {
    event: "customer.password_reset",
    context: {
        subscriberId: "product-update-handler",
    },
};

// export default userPasswordResetSubscriber;