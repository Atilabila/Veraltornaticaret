'use server';

import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmationEmail';
import { formatPrice } from '@/lib/utils';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendOrderEmailParams {
    to: string;
    orderNumber: string;
    customerName: string;
    items: any[];
    total: number;
    address: string;
    date: string;
}

export async function sendOrderConfirmationEmail(params: SendOrderEmailParams) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[EMAIL] RESEND_API_KEY is missing. Skipping email send.');
        return { success: false, error: 'API Key missing' };
    }

    try {
        const { to, orderNumber, customerName, items, total, address, date } = params;

        const { data, error } = await resend.emails.send({
            from: 'VERAL <siparis@veral.com.tr>', // You need to verify this domain in Resend dashboard
            to: [to],
            subject: `Siparişiniz Alındı: ${orderNumber}`,
            react: OrderConfirmationEmail({
                orderNumber,
                customerName,
                orderDate: date,
                totalAmount: formatPrice(total),
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: address
            }) as React.ReactElement,
        });

        if (error) {
            console.error('[EMAIL] Failed to send email:', error);
            return { success: false, error: error.message };
        }

        console.log('[EMAIL] Email sent successfully:', data?.id);
        return { success: true, id: data?.id };

    } catch (error) {
        console.error('[EMAIL] Unexpected error:', error);
        return { success: false, error: 'Unexpected error' };
    }
}
