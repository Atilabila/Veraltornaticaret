// =====================================================
// PAYMENT PROVIDER TYPES
// =====================================================

export interface PaymentRequest {
    orderId: string;
    orderNumber: string;
    amount: number; // in TRY (Turkish Lira)
    currency: 'TRY';
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        country: string;
    };
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
    }>;
    callbackUrl: string;
    cancelUrl: string;
}

export interface PaymentResponse {
    success: boolean;
    paymentId?: string;
    redirectUrl?: string;
    error?: string;
    errorCode?: string;
}

export interface PaymentStatus {
    paymentId: string;
    status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
    amount?: number;
    paidAt?: string;
    error?: string;
}

export interface WebhookPayload {
    paymentId: string;
    status: 'success' | 'failure';
    orderId: string;
    signature?: string;
}

// =====================================================
// PAYMENT PROVIDER INTERFACE
// =====================================================

export interface PaymentProvider {
    name: string;

    /**
     * Initialize a payment and get redirect URL or payment form data
     */
    createPayment(request: PaymentRequest): Promise<PaymentResponse>;

    /**
     * Verify payment status after callback
     */
    verifyPayment(paymentId: string): Promise<PaymentStatus>;

    /**
     * Validate webhook signature and parse payload
     */
    parseWebhook(rawBody: string, signature?: string): Promise<WebhookPayload | null>;

    /**
     * Request refund for a payment
     */
    refund?(paymentId: string, amount?: number): Promise<{ success: boolean; error?: string }>;
}

// =====================================================
// PAYMENT CONFIG TYPE
// =====================================================

export interface PaymentConfig {
    provider: 'iyzico' | 'paytr' | 'stripe' | 'mock';
    sandboxMode: boolean;
    apiKey?: string;
    secretKey?: string;
    merchantId?: string;
}
