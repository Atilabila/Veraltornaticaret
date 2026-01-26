import type { PaymentProvider, PaymentRequest, PaymentResponse, PaymentStatus, WebhookPayload } from '../types';

// =====================================================
// MOCK PAYMENT PROVIDER (Dev Only)
// =====================================================

let devPaymentSimulation: 'success' | 'fail' = 'success';

export function setDevPaymentSimulation(mode: 'success' | 'fail') {
    devPaymentSimulation = mode;
    console.log('[MOCK_PAYMENT] Simulation mode set to:', mode);
}

export function getDevPaymentSimulation() {
    return devPaymentSimulation;
}

export class MockProvider implements PaymentProvider {
    name = 'mock';

    private simulatedDelay = 1500; // ms

    async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
        console.log('[MOCK_PAYMENT] Creating payment:', request.orderNumber);
        console.log('[MOCK_PAYMENT] Amount:', request.amount, 'TRY');
        console.log('[MOCK_PAYMENT] Simulation mode:', devPaymentSimulation);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, this.simulatedDelay));

        if (devPaymentSimulation === 'fail') {
            return {
                success: false,
                error: 'Simulated payment failure (dev mode)',
                errorCode: 'SIMULATED_FAILURE',
            };
        }

        const paymentId = `mock_pay_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

        return {
            success: true,
            paymentId,
            // In real implementation, this would redirect to payment page
            // For mock, we simulate instant success
        };
    }

    async verifyPayment(paymentId: string): Promise<PaymentStatus> {
        console.log('[MOCK_PAYMENT] Verifying payment:', paymentId);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (devPaymentSimulation === 'fail') {
            return {
                paymentId,
                status: 'failed',
                error: 'Simulated verification failure',
            };
        }

        return {
            paymentId,
            status: 'completed',
            amount: 0, // Would come from payment gateway
            paidAt: new Date().toISOString(),
        };
    }

    async parseWebhook(rawBody: string, signature?: string): Promise<WebhookPayload | null> {
        console.log('[MOCK_PAYMENT] Parsing webhook');

        try {
            const data = JSON.parse(rawBody);
            return {
                paymentId: data.paymentId || 'mock_webhook',
                status: devPaymentSimulation === 'success' ? 'success' : 'failure',
                orderId: data.orderId || '',
            };
        } catch {
            return null;
        }
    }

    async refund(paymentId: string, amount?: number): Promise<{ success: boolean; error?: string }> {
        console.log('[MOCK_PAYMENT] Refunding:', paymentId, amount);

        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true };
    }
}
