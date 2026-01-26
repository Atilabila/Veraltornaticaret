import type { PaymentProvider, PaymentRequest, PaymentResponse, PaymentStatus, WebhookPayload } from '../types';

// =====================================================
// PAYTR PAYMENT PROVIDER (Placeholder)
// =====================================================

export class PayTRProvider implements PaymentProvider {
    name = 'paytr';

    private merchantId: string;
    private merchantKey: string;
    private merchantSalt: string;
    private sandboxMode: boolean;

    constructor(config: {
        merchantId: string;
        merchantKey: string;
        merchantSalt: string;
        sandboxMode?: boolean;
    }) {
        this.merchantId = config.merchantId;
        this.merchantKey = config.merchantKey;
        this.merchantSalt = config.merchantSalt;
        this.sandboxMode = config.sandboxMode ?? true;
    }

    async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
        console.log('[PAYTR] Creating payment:', request.orderNumber);

        // TODO: Implement actual PayTR API call
        // Reference: https://dev.paytr.com/

        /*
        const paytrRequest = {
            merchant_id: this.merchantId,
            user_ip: '127.0.0.1', // Get from request
            merchant_oid: request.orderId,
            email: request.customer.email,
            payment_amount: Math.round(request.amount * 100), // PayTR uses kuruş
            user_basket: base64Encode(JSON.stringify(request.items)),
            user_name: request.customer.name,
            user_address: request.customer.address,
            user_phone: request.customer.phone,
            merchant_ok_url: request.callbackUrl,
            merchant_fail_url: request.cancelUrl,
            // ... more fields + hash
        };
        */

        return {
            success: false,
            error: 'PayTR integration not configured. Please set merchant credentials.',
            errorCode: 'NOT_CONFIGURED',
        };
    }

    async verifyPayment(paymentId: string): Promise<PaymentStatus> {
        console.log('[PAYTR] Verifying payment:', paymentId);

        return {
            paymentId,
            status: 'pending',
            error: 'Verification not implemented',
        };
    }

    async parseWebhook(rawBody: string, signature?: string): Promise<WebhookPayload | null> {
        console.log('[PAYTR] Parsing webhook');

        // TODO: Implement hash verification
        // PayTR sends POST with merchant_oid, status, total_amount, hash

        return null;
    }

    async refund(paymentId: string, amount?: number): Promise<{ success: boolean; error?: string }> {
        console.log('[PAYTR] Refunding:', paymentId, amount);

        return { success: false, error: 'Refund not implemented' };
    }
}
