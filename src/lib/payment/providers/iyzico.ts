import type { PaymentProvider, PaymentRequest, PaymentResponse, PaymentStatus, WebhookPayload } from '../types';

// =====================================================
// IYZICO PAYMENT PROVIDER (Placeholder)
// =====================================================

export class IyzicoProvider implements PaymentProvider {
    name = 'iyzico';

    private apiKey: string;
    private secretKey: string;
    private sandboxMode: boolean;

    constructor(config: { apiKey: string; secretKey: string; sandboxMode?: boolean }) {
        this.apiKey = config.apiKey;
        this.secretKey = config.secretKey;
        this.sandboxMode = config.sandboxMode ?? true;
    }

    private getBaseUrl(): string {
        return this.sandboxMode
            ? 'https://sandbox-api.iyzipay.com'
            : 'https://api.iyzipay.com';
    }

    async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
        console.log('[IYZICO] Creating payment:', request.orderNumber);

        // TODO: Implement actual Iyzico API call
        // Reference: https://dev.iyzipay.com/

        /*
        const iyzicoRequest = {
            locale: 'tr',
            conversationId: request.orderId,
            price: request.amount.toString(),
            paidPrice: request.amount.toString(),
            currency: 'TRY',
            basketId: request.orderNumber,
            paymentGroup: 'PRODUCT',
            callbackUrl: request.callbackUrl,
            buyer: {
                id: request.customer.email,
                name: request.customer.name.split(' ')[0],
                surname: request.customer.name.split(' ').slice(1).join(' ') || 'X',
                email: request.customer.email,
                gsmNumber: request.customer.phone,
                registrationAddress: request.customer.address,
                city: request.customer.city,
                country: request.customer.country,
            },
            // ... more fields
        };
        */

        return {
            success: false,
            error: 'Iyzico integration not configured. Please set API keys.',
            errorCode: 'NOT_CONFIGURED',
        };
    }

    async verifyPayment(paymentId: string): Promise<PaymentStatus> {
        console.log('[IYZICO] Verifying payment:', paymentId);

        // TODO: Implement actual verification

        return {
            paymentId,
            status: 'pending',
            error: 'Verification not implemented',
        };
    }

    async parseWebhook(rawBody: string, signature?: string): Promise<WebhookPayload | null> {
        console.log('[IYZICO] Parsing webhook');

        // TODO: Implement webhook signature verification and parsing

        return null;
    }

    async refund(paymentId: string, amount?: number): Promise<{ success: boolean; error?: string }> {
        console.log('[IYZICO] Refunding:', paymentId, amount);

        return { success: false, error: 'Refund not implemented' };
    }
}
