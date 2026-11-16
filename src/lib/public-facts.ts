export const PUBLIC_HOURS = "Pazartesi - Cumartesi 08:30 - 18:30";
export const PUBLIC_HOURS_LABEL = `Çalışma Saatleri: ${PUBLIC_HOURS}`;
export const PUBLIC_ALWAYS_ON = "7 / 24 hizmet veriyor";

/** Public workshop address. The old 1512 Sokak line is not used on the site. */
export const PUBLIC_ADDRESS = "1471 Sokak No:12/A\nAlsancak / İzmir";

export function publicAddress(stored?: string | null): string {
    const raw = (stored || "").replace(/\r/g, "").trim();
    if (!raw || raw.includes("1512")) return PUBLIC_ADDRESS;
    return raw;
}
