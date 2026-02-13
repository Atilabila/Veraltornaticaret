export function normalizeWhatsappNumber(raw: string): string {
    return String(raw || '').replace(/\D/g, '');
}

export function buildWhatsAppUrl(params: { phoneNumber: string; message: string }): string {
    const phone = normalizeWhatsappNumber(params.phoneNumber);
    const text = encodeURIComponent(params.message || '');
    return `https://wa.me/${phone}?text=${text}`;
}

export type WhatsAppOrderSummary = {
    orderNumber: string;
    shipping: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        district: string;
        postalCode?: string;
        notes?: string;
    };
    items: Array<{
        name: string;
        size: string;
        quantity: number;
        unitPrice: number;
    }>;
    total: number;
};

export function buildWhatsAppOrderMessage(order: WhatsAppOrderSummary): string {
    const lines: string[] = [];

    lines.push('Merhaba, sipariş oluşturmak istiyorum.');
    lines.push('');
    lines.push(`Sipariş No: ${order.orderNumber}`);
    lines.push('');
    lines.push('Teslimat Bilgileri:');
    lines.push(`- Ad Soyad: ${order.shipping.fullName}`);
    lines.push(`- Telefon: ${order.shipping.phone}`);
    lines.push(`- E-posta: ${order.shipping.email}`);
    lines.push(`- Adres: ${order.shipping.address}, ${order.shipping.district}/${order.shipping.city}${order.shipping.postalCode ? ` (${order.shipping.postalCode})` : ''}`);

    const notes = (order.shipping.notes || '').trim();
    if (notes) lines.push(`- Not: ${notes}`);

    lines.push('');
    lines.push('Ürünler:');
    order.items.forEach((it, idx) => {
        lines.push(`${idx + 1}) ${it.name} | ${it.size} | ${it.quantity} adet | ${it.unitPrice} TL`);
    });

    lines.push('');
    lines.push(`Toplam: ${order.total} TL`);

    return lines.join('\n');
}
