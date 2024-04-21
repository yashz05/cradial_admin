import { AbstractPaymentProcessor, CartService, MedusaContainer, PaymentProcessorContext, PaymentProcessorError, PaymentProcessorSessionResponse, PaymentSessionStatus } from "@medusajs/medusa";
import CCavenue from "../lib/ccavenue";
import { MedusaError, MedusaErrorTypes } from "@medusajs/utils";
export interface CCAvenuePaymentProcessorConfig {
    /**
     * can all this details from here: https://dashboard.ccavenue.com/settings/apiKeys.do
     * working_key: 32-Bit Key provided by CCAvenue.
     * merchant_id: id for merchant provided by CCAvenue.
     * access_code: Access Code provided by CCAvenue.
     */
    working_key: string;
    merchant_id: string;
    access_code: string;
    redirect_url: string;
    cancel_url: string;
}


class CCAvenuePaymentProcessor extends AbstractPaymentProcessor {

    updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    static identifier = "CCAvenue";
    
    protected readonly cartService: CartService;
    protected readonly configuration: CCAvenuePaymentProcessorConfig ;
    protected readonly ccAvenue: CCavenue;

    constructor(
        container: MedusaContainer,
        options: CCAvenuePaymentProcessorConfig
    ) {
        //@ts-ignore
        super(container);
        // console.log("this is the wjfbkler", options['projectConfig'].working_key);
        
        if (!options['projectConfig'].access_code || !options['projectConfig'].merchant_id || !options['projectConfig'].working_key) {
            throw new MedusaError(
                MedusaError.Types.INVALID_ARGUMENT,
                "The CCAvenue Provider Requires access_code,merchant_id and working_key in the options"
            );
        }
        this.configuration = options;
        this.ccAvenue = new CCavenue(this.configuration);
        
        
        // if (this.cartService.retrieveWithTotals === undefined) {
        //     throw new MedusaError(
        //         MedusaError.Types.UNEXPECTED_STATE,
        //         "Your Medusa installation contains an outdated cartService implementation. Update your Medusa installation.",
        //     );
        // }
    }

    async initiatePayment(
        context: PaymentProcessorContext
    ): Promise<
        PaymentProcessorError | PaymentProcessorSessionResponse
    > {
        console.log("this is context of the payment", context);
        // assuming client is an initialized client
        // communicating with a third-party service.
        const paymentRequestHtml = await this.ccAvenue.initiatePaymentRequest(context)
        console.log(paymentRequestHtml);
        const paymentHtml = `
                <html>
                    <head>
                        <title>Payment Processing</title>
                    </head>
                    <body>
                        ${paymentRequestHtml}
                    </body>
                </html>
            `;

        // Replace the current document content with the payment HTML
        document.open();
        document.write(paymentHtml);
        document.close();

        return {
            session_data: {
                id: 'dummy'
            },
        }
    }

    capturePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    authorizePayment(paymentSessionData: Record<string, unknown>, context: Record<string, unknown>): Promise<PaymentProcessorError | { status: PaymentSessionStatus; data: Record<string, unknown>; }> {
        throw new Error("Method not implemented.");
    }
    cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
        throw new Error("Method not implemented.");
    }
    refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    retrievePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }
    updatePayment(context: PaymentProcessorContext): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
        throw new Error("Method not implemented.");
    }

}

export default CCAvenuePaymentProcessor