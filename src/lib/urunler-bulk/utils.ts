export type PriceParseTRYResult =
    | { ok: true; value: number }
    | { ok: false; code: "INVALID_PRICE_FORMAT" | "INVALID_PRICE_RANGE" };

export type PasteDelimiter = "\t" | ";" | ",";

/**
 * Normalizes names for duplicate checks:
 * trim + collapse whitespace + lowercase.
 */
export function normalizeProductName(name: string): string {
    return name.trim().replace(/\s+/g, " ").toLowerCase();
}

/**
 * Parses TRY price strings.
 * Supports: 350, 350.50, 350,50, ₺350,50, TL 350,50
 */
export function parsePriceTRY(input: string): PriceParseTRYResult {
    const raw = input
        .replace(/\u20BA/g, "") // TRY currency symbol
        .replace(/\u00E2\u201A\u00BA/g, "") // mojibake for TRY symbol
        .replace(/tl/gi, "")
        .replace(/\s+/g, "");
    if (!raw) return { ok: false, code: "INVALID_PRICE_FORMAT" };
    if (raw.startsWith("-")) return { ok: false, code: "INVALID_PRICE_RANGE" };
    if (/[^0-9.,]/.test(raw)) return { ok: false, code: "INVALID_PRICE_FORMAT" };

    const normalized = normalizeNumericString(raw);
    if (!normalized) return { ok: false, code: "INVALID_PRICE_FORMAT" };

    const parsed = Number(normalized);
    if (!Number.isFinite(parsed)) return { ok: false, code: "INVALID_PRICE_FORMAT" };
    if (parsed <= 0) return { ok: false, code: "INVALID_PRICE_RANGE" };

    const decimals = normalized.includes(".") ? (normalized.split(".")[1]?.length ?? 0) : 0;
    if (decimals > 2) return { ok: false, code: "INVALID_PRICE_RANGE" };

    return { ok: true, value: Number(parsed.toFixed(2)) };
}

/**
 * Delimiter detection priority:
 * 1) tab, 2) semicolon, 3) comma.
 */
export function detectDelimiter(text: string): PasteDelimiter {
    if (text.includes("\t")) return "\t";
    if (text.includes(";")) return ";";
    return ",";
}

/**
 * Parses clipboard text into row/cell matrix.
 * Supports quoted CSV values, escaped quotes (""), and mixed line endings.
 */
export function parsePaste(text: string): string[][] {
    if (!text.trim()) return [];

    const delimiter = detectDelimiter(text);
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = "";
    let inQuotes = false;

    const pushCell = () => {
        row.push(cell.trim());
        cell = "";
    };

    const pushRow = () => {
        const cleaned = row.map((value) => value.trim());
        if (cleaned.some((value) => value.length > 0)) {
            rows.push(cleaned);
        }
        row = [];
    };

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const next = text[i + 1];

        if (char === '"') {
            if (inQuotes && next === '"') {
                cell += '"';
                i++;
                continue;
            }
            inQuotes = !inQuotes;
            continue;
        }

        if (!inQuotes && char === delimiter) {
            pushCell();
            continue;
        }

        if (!inQuotes && (char === "\n" || char === "\r")) {
            if (char === "\r" && next === "\n") i++;
            pushCell();
            pushRow();
            continue;
        }

        cell += char;
    }

    pushCell();
    pushRow();

    return rows;
}

function normalizeNumericString(raw: string): string | null {
    const separators = [...raw].filter((ch) => ch === "." || ch === ",").length;
    if (separators === 0) return /^\d+$/.test(raw) ? raw : null;

    const lastComma = raw.lastIndexOf(",");
    const lastDot = raw.lastIndexOf(".");
    const lastSepIndex = Math.max(lastComma, lastDot);
    const trailing = raw.slice(lastSepIndex + 1);
    const leading = raw.slice(0, lastSepIndex);
    const leadingDigits = leading.replace(/[.,]/g, "");

    if (!/^\d+$/.test(leadingDigits || "0")) return null;
    if (!/^\d+$/.test(trailing || "")) return null;
    if (trailing.length === 0) return null;

    if (trailing.length <= 2) {
        return `${leadingDigits || "0"}.${trailing}`;
    }

    if (trailing.length === 3) {
        return raw.replace(/[.,]/g, "");
    }

    return null;
}
