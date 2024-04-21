import axios, { AxiosInstance } from "axios";
import { encrypt, decrypt } from "../utils/ccavutil";
import { PaymentProcessorContext } from "@medusajs/medusa";
import { CCAvenuePaymentProcessorConfig } from "src/services/ccavenue-payment-processer";
import QueryString from "qs";
import { log } from "console";
import crypto from 'crypto';
const CCAVENUE_API_PATH = "https://secure.ccavenue.com/transaction/transaction.do";
// const crypto = require('crypto');
import querystring from 'querystring';
import https from 'https'
type HTTPMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "OPTIONS"
    | "HEAD";

interface Request {
    path: string;
    method: HTTPMethod;
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
    query?: Record<string, string>;
}


export default class CCavenue {
    private readonly axiosInstance: AxiosInstance;
    private readonly working_key: string;
    private readonly merchant_id: string;
    private readonly access_code: string;
    private readonly redirect_url: string;
    private readonly cancel_url: string;

    ;

    constructor(options: CCAvenuePaymentProcessorConfig) {
        this.working_key = options.working_key;
        this.merchant_id = options.merchant_id;
        this.access_code = options.access_code;
        this.redirect_url = options.redirect_url;
        this.cancel_url = options.cancel_url;
        this.axiosInstance = axios.create({
            baseURL: CCAVENUE_API_PATH,
        });
    }

    public async initiatePaymentRequest<T>(requestData: PaymentProcessorContext): Promise<string> {
        try {
            const requestBody = {
                merchant_id: 'erfgerg',
                order_id: requestData.resource_id,
                currency: requestData.currency_code,
                amount: requestData.amount,
                redirect_url: 'ergerger',
                cancel_url: 'ergerg',
                language: "EN", // need to make fetch this from medusa admin settings
                // billing related information
                billing_name: `${requestData.billing_address.first_name} ${requestData.billing_address.last_name}`,
                billing_address: requestData.billing_address.address_1,
                billing_city: requestData.billing_address.city,
                // billing_email : requestData.billing_address.email,
                // billing_state: 
                billing_zip: requestData.billing_address.postal_code,
                billing_country: requestData.billing_address.country,
                billing_tel: requestData.billing_address.phone,
                billing_email: "yashc1999@gmail.com",
                // delivery details
                // currently don't know exactly where to get 
                // delivery_name:
                // delivery_address:
                // delivery_city:   
                // delivery_state:
                // delivery_zip:
                // delivery_country:
                // delivery_tel:
                // additional info
                // merchant_param1:
                // merchant_param2:
                // merchant_param3:
                // merchant_param4:
                // merchant_param5:
                // integration_type: "iframe_normal",
                //promo_code:
                customer_identifier: requestData.customer.id
            };
            // const requestBodyString = JSON.stringify(requestBody);
            // // const encRequest = encrypt(requestBody,this.working_key);
            // const encRequest = encrypt(requestBodyString, this.working_key);

            const rd = Object.keys(requestBody)
                .map(key => `${key}=${encodeURIComponent(requestBody[key])}`)
                .join('&');
            // const encryptedData = encrypt(rd, 'B38674E7A69677D0376DF414AD3AE82E');

            // Encrypt the data
            // const encryptedData = crypto.createHash('sha256')
            //     .update(rd + 'B38674E7A69677D0376DF414AD3AE82E')
            //     .digest('hex');



            // const formBody = '<html><head><title>Sub-merchant checkout page</title>' +
            //     '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center>' +
            //     '<!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame"' +
            //     ' src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='
            //     + this.merchant_id + '&encRequest='
            //     + encryptedData + '&access_code='
            //     + this.access_code +
            //     '"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>'

            // let formBody = '<form method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction">' +
            //     "<input type='hidden' name='encRequest' value='"+encryptedData+"'>" +
            //     '<input type=hidden name=access_code value='+this.access_code+'>'
            //     +
            //     '</form>'




            // let formBody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=' + '2796563' + '&encRequest=' + encryptedData + '&access_code=' + 'AVSZ09KI06AA59ZSAA' + '"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
            const merchantId = "Your_Merchant_ID";
            const orderId = "Your_Order_ID";
            const amount = "Your_Amount";
            const currency = "INR";
            const redirectUrl = "Your_Redirect_URL";
            const workingKey = "Your_Working_Key";

            // Construct the data string
            const dataString = `${merchantId}|${orderId}|${amount}|${redirectUrl}|${workingKey}`;

            // Encrypt the data using AES
            const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(workingKey), Buffer.from(''));
            let encryptedDatad = cipher.update(dataString, 'utf8', 'hex');
            encryptedDatad += cipher.final('hex');

            // Prepare the payload
            const payload = {
                encRequest: encryptedDatad,
                access_code: workingKey
            };

            // Convert payload to query string
            const query = querystring.stringify(payload);

            // Make HTTP request to CCAvenue
            const options = {
                hostname: 'secure.ccavenue.com',
                path: '/transaction/transaction.do?command=initiateTransaction',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(query)
                }
            };

            const req = https.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    console.log(responseData); // Handle the response from CCAvenue
                });
            });

            req.on('error', (error) => {
                console.error(error);
            });

            // Write the query string data to the request body
            req.write(query);
            req.end();
            // console.log("this is the formBody which i got from the ccAvenue", formBody);
            return 'formBody';
        } catch (error) {
            throw new Error(`Error in initiatePaymentRequest: ${error.message}`);
        }
    }


}