import "server-only";

import { slugify } from "@/lib/utils";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { normalizeProductName, parsePriceTRY } from "@/lib/urunler-bulk/utils";
import type {
    AdminUrunlerBulkRequest,
    AdminUrunlerBulkRequestRow,
    AdminUrunlerBulkResponse,
    BulkRowErrorCode,
    BulkRowResult,
} from "@/lib/urunler-bulk/types";

const MAX_ROWS = 500;
const MAX_NAME_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_FEATURE_LENGTH = 120;

const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type PayloadValidationResult =
    | { ok: true; payload: AdminUrunlerBulkRequest }
    | { ok: false; status: 400; error: { code: string; message: string } };

type PriceParseResult =
    | { ok: true; value: number }
    | { ok: false; code: "REQUIRED_PRICE" | "INVALID_PRICE_FORMAT" | "INVALID_PRICE_RANGE" };

type PreparedRow = {
    rowIndex: number;
    name: string;
    normalizedName: string;
    priceRaw: string | number | undefined;
    imageUrl: string;
    description: string;
    features: string[];
};

function asString(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (typeof value === "string") return value.trim();
    if (typeof value === "number" || typeof value === "boolean") return String(value).trim();
    return "";
}

function isUuid(value: string): boolean {
    return UUID_REGEX.test(value);
}

function isHttpUrl(value: string): boolean {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

function parsePrice(raw: string | number | undefined): PriceParseResult {
    if (raw === null || raw === undefined) {
        return { ok: false, code: "REQUIRED_PRICE" };
    }

    if (typeof raw === "string") {
        const text = raw.trim();
        if (!text) return { ok: false, code: "REQUIRED_PRICE" };
        const result = parsePriceTRY(text);
        return result.ok
            ? { ok: true, value: result.value }
            : { ok: false, code: result.code };
    }

    if (typeof raw === "number") {
        if (!Number.isFinite(raw)) return { ok: false, code: "INVALID_PRICE_FORMAT" };
        const result = parsePriceTRY(String(raw));
        return result.ok
            ? { ok: true, value: result.value }
            : { ok: false, code: result.code };
    }

    return { ok: false, code: "INVALID_PRICE_FORMAT" };
}

function isFullyEmptyRow(row: PreparedRow): boolean {
    const noPrice =
        row.priceRaw === null ||
        row.priceRaw === undefined ||
        (typeof row.priceRaw === "string" && row.priceRaw.trim() === "");

    return (
        !row.name &&
        !row.imageUrl &&
        !row.description &&
        row.features.every((feature) => !feature) &&
        noPrice
    );
}

function addError(target: BulkRowErrorCode[], code: BulkRowErrorCode) {
    if (!target.includes(code)) target.push(code);
}

function toPreparedRow(row: AdminUrunlerBulkRequestRow, rowIndexFallback: number): PreparedRow {
    const rowIndex =
        typeof row.rowIndex === "number" && Number.isInteger(row.rowIndex) && row.rowIndex > 0
            ? row.rowIndex
            : rowIndexFallback;

    const name = asString(row.name);
    const imageUrl = asString(row.imageUrl);
    const description = asString(row.description);
    const features = [
        asString(row.feature1),
        asString(row.feature2),
        asString(row.feature3),
        asString(row.feature4),
    ];

    return {
        rowIndex,
        name,
        normalizedName: normalizeProductName(name),
        priceRaw: row.price,
        imageUrl,
        description,
        features,
    };
}

export function validateBulkRequestPayload(payload: unknown): PayloadValidationResult {
    if (!payload || typeof payload !== "object") {
        return {
            ok: false,
            status: 400,
            error: { code: "INVALID_PAYLOAD", message: "Body must be a JSON object." },
        };
    }

    const maybePayload = payload as Partial<AdminUrunlerBulkRequest>;
    const categoryId = asString(maybePayload.categoryId);
    const rows = maybePayload.rows;

    if (!categoryId || !isUuid(categoryId)) {
        return {
            ok: false,
            status: 400,
            error: {
                code: "CATEGORY_REQUIRED",
                message: "categoryId is required and must be a valid UUID.",
            },
        };
    }

    if (!Array.isArray(rows)) {
        return {
            ok: false,
            status: 400,
            error: { code: "INVALID_PAYLOAD", message: "rows must be an array." },
        };
    }

    if (rows.length > MAX_ROWS) {
        return {
            ok: false,
            status: 400,
            error: { code: "INVALID_PAYLOAD", message: `rows cannot exceed ${MAX_ROWS}.` },
        };
    }

    return {
        ok: true,
        payload: {
            categoryId,
            rows: rows as AdminUrunlerBulkRequestRow[],
        },
    };
}

function createBaseSlug(name: string): string {
    const fromSlugify = slugify(name);
    if (fromSlugify) return fromSlugify;

    const fallback = normalizeProductName(name)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    if (fallback) return fallback;

    return "urun";
}

function buildSlugCandidate(baseSlug: string, attempt: number): string {
    if (attempt <= 0) return baseSlug;
    return `${baseSlug}-${attempt + 1}`;
}

function isUniqueConstraintViolation(error: unknown, constraintNamePart: string): boolean {
    const err = error as { code?: string; message?: string; details?: string };
    const haystack = `${err?.message ?? ""} ${err?.details ?? ""}`.toLowerCase();
    return err?.code === "23505" && haystack.includes(constraintNamePart.toLowerCase());
}

export async function insertBulkAdminUrunler(
    payload: AdminUrunlerBulkRequest
): Promise<AdminUrunlerBulkResponse> {
    const admin = createAdminSupabaseClient();

    const { data: existingProducts, error: existingProductsError } = await (admin as any)
        .from("metal_products")
        .select("name, slug");

    if (existingProductsError) {
        throw new Error(existingProductsError.message || "Failed to load existing products.");
    }

    const existingNormalizedNames = new Set<string>();
    const existingSlugs = new Set<string>();

    for (const product of (existingProducts || []) as Array<{ name: string; slug: string }>) {
        if (product?.name) {
            existingNormalizedNames.add(normalizeProductName(product.name));
        }
        if (product?.slug) existingSlugs.add(product.slug);
    }

    const results: BulkRowResult[] = [];
    const seenBatchNormalizedNames = new Set<string>();
    let insertedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < payload.rows.length; i++) {
        const prepared = toPreparedRow(payload.rows[i], i + 1);
        if (isFullyEmptyRow(prepared)) continue;

        const errors: BulkRowErrorCode[] = [];

        if (!payload.categoryId) addError(errors, "CATEGORY_REQUIRED");
        if (!prepared.name) addError(errors, "REQUIRED_NAME");
        if (!prepared.imageUrl) addError(errors, "REQUIRED_IMAGE_URL");

        if (prepared.name.length > MAX_NAME_LENGTH) addError(errors, "MAX_LENGTH_EXCEEDED");
        if (prepared.description.length > MAX_DESCRIPTION_LENGTH) addError(errors, "MAX_LENGTH_EXCEEDED");
        if (prepared.features.some((feature) => feature.length > MAX_FEATURE_LENGTH)) {
            addError(errors, "MAX_LENGTH_EXCEEDED");
        }

        if (prepared.imageUrl && !isHttpUrl(prepared.imageUrl)) {
            addError(errors, "INVALID_IMAGE_URL");
        }

        const priceParsed = parsePrice(prepared.priceRaw);
        if (!priceParsed.ok) addError(errors, priceParsed.code);

        if (prepared.normalizedName) {
            if (seenBatchNormalizedNames.has(prepared.normalizedName)) {
                addError(errors, "DUPLICATE_NAME_IN_BATCH");
            } else {
                seenBatchNormalizedNames.add(prepared.normalizedName);
            }

            if (existingNormalizedNames.has(prepared.normalizedName)) {
                addError(errors, "DUPLICATE_NAME_IN_DB");
            }
        }

        if (errors.length > 0) {
            results.push({
                rowIndex: prepared.rowIndex,
                status: "failed",
                errors,
            });
            failedCount++;
            continue;
        }

        const baseSlug = createBaseSlug(prepared.name);
        let insertedId: string | null = null;
        let lastError: unknown = null;
        let attempt = 0;

        while (attempt < 25 && !insertedId) {
            const slugCandidate = buildSlugCandidate(baseSlug, attempt);

            if (existingSlugs.has(slugCandidate)) {
                attempt++;
                continue;
            }

            const { data, error } = await (admin as any).rpc(
                "insert_metal_product_with_features",
                {
                    p_name: prepared.name,
                    p_slug: slugCandidate,
                    p_description: prepared.description,
                    p_price: (priceParsed as { ok: true; value: number }).value,
                    p_image_url: prepared.imageUrl,
                    p_category_id: payload.categoryId,
                    p_is_active: true,
                    p_stock_quantity: 0,
                    p_background_color: "#0A0A0A",
                    p_is_showcase: false,
                    p_features: prepared.features,
                }
            );

            if (!error && data) {
                insertedId = String(data);
                existingSlugs.add(slugCandidate);
                existingNormalizedNames.add(prepared.normalizedName);
                break;
            }

            lastError = error;

            if (isUniqueConstraintViolation(error, "metal_products_slug_key")) {
                existingSlugs.add(slugCandidate);
                attempt++;
                continue;
            }

            break;
        }

        if (!insertedId) {
            const rowErrors: BulkRowErrorCode[] = [];

            if (
                isUniqueConstraintViolation(lastError, "ux_metal_products_name_normalized") ||
                isUniqueConstraintViolation(lastError, "normalize_product_name")
            ) {
                addError(rowErrors, "DUPLICATE_NAME_IN_DB");
            } else {
                addError(rowErrors, "DB_INSERT_FAILED");
            }

            results.push({
                rowIndex: prepared.rowIndex,
                status: "failed",
                errors: rowErrors,
            });
            failedCount++;
            continue;
        }

        results.push({
            rowIndex: prepared.rowIndex,
            status: "inserted",
            errors: [],
            insertedId,
        });
        insertedCount++;
    }

    return {
        insertedCount,
        failedCount,
        results,
    };
}
