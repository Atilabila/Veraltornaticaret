// MP-07: Reference Number Generator

/**
 * Generates unique quote reference number
 * Format: QTE-YYYYMMDD-XXXX
 * Example: QTE-20260126-A7F3
 */
export function generateQuoteReference(): string {
    const now = new Date();

    // Date part: YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`;

    // Random part: 4 alphanumeric characters (uppercase)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `QTE-${datePart}-${randomPart}`;
}

/**
 * Validates quote reference format
 */
export function isValidQuoteReference(ref: string): boolean {
    const pattern = /^QTE-\d{8}-[A-Z0-9]{4}$/;
    return pattern.test(ref);
}
