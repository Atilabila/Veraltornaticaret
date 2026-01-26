import type { PaymentProvider, PaymentConfig } from './types';
import { IyzicoProvider } from './providers/iyzico';
import { PayTRProvider } from './providers/paytr';
import { MockProvider } from './providers/mock';

export * from './types';
export { setDevPaymentSimulation, getDevPaymentSimulation } from './providers/mock';

// =====================================================
// PAYMENT SERVICE FACTORY
// =====================================================

let currentProvider: PaymentProvider | null = null;

export function initializePayment(config: PaymentConfig): PaymentProvider {
    switch (config.provider) {
        case 'iyzico':
            if (!config.apiKey || !config.secretKey) {
                console.warn('[PAYMENT] Iyzico credentials missing, falling back to mock');
                currentProvider = new MockProvider();
            } else {
                currentProvider = new IyzicoProvider({
                    apiKey: config.apiKey,
                    secretKey: config.secretKey,
                    sandboxMode: config.sandboxMode,
                });
            }
            break;

        case 'paytr':
            if (!config.merchantId || !config.apiKey || !config.secretKey) {
                console.warn('[PAYMENT] PayTR credentials missing, falling back to mock');
                currentProvider = new MockProvider();
            } else {
                currentProvider = new PayTRProvider({
                    merchantId: config.merchantId,
                    merchantKey: config.apiKey,
                    merchantSalt: config.secretKey,
                    sandboxMode: config.sandboxMode,
                });
            }
            break;

        case 'mock':
        default:
            currentProvider = new MockProvider();
            break;
    }

    console.log('[PAYMENT] Initialized provider:', currentProvider.name);
    return currentProvider;
}

export function getPaymentProvider(): PaymentProvider {
    if (!currentProvider) {
        // Default to mock in development
        console.warn('[PAYMENT] No provider initialized, using mock');
        currentProvider = new MockProvider();
    }
    return currentProvider;
}

// =====================================================
// CONVENIENCE FUNCTIONS
// =====================================================

export async function processPayment(
    orderId: string,
    orderNumber: string,
    amount: number,
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
    },
    items: Array<{ id: string; name: string; price: number; quantity: number }>
) {
    const provider = getPaymentProvider();

    return provider.createPayment({
        orderId,
        orderNumber,
        amount,
        currency: 'TRY',
        customer: {
            ...customer,
            country: 'TR',
        },
        items: items,
        callbackUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/payment/callback`,
        cancelUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/odeme?cancelled=true`,
    });
}
