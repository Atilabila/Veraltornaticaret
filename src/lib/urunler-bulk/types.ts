/**
 * Shared contract for /api/admin/urunler/bulk endpoint and UI table rows.
 */
export type BulkRowErrorCode =
    | "REQUIRED_NAME"
    | "REQUIRED_PRICE"
    | "INVALID_PRICE_FORMAT"
    | "INVALID_PRICE_RANGE"
    | "REQUIRED_IMAGE_URL"
    | "INVALID_IMAGE_URL"
    | "DUPLICATE_NAME_IN_BATCH"
    | "DUPLICATE_NAME_IN_DB"
    | "CATEGORY_REQUIRED"
    | "MAX_LENGTH_EXCEEDED"
    | "DB_INSERT_FAILED";

export type BulkRowResult = {
    rowIndex: number;
    status: "inserted" | "failed";
    errors: BulkRowErrorCode[];
    insertedId?: string;
};

export type AdminUrunlerBulkRequestRow = {
    rowIndex?: number;
    name?: string;
    price?: string | number;
    imageUrl?: string;
    description?: string;
    feature1?: string;
    feature2?: string;
    feature3?: string;
    feature4?: string;
};

export type AdminUrunlerBulkRequest = {
    categoryId: string;
    rows: AdminUrunlerBulkRequestRow[];
};

export type AdminUrunlerBulkResponse = {
    insertedCount: number;
    failedCount: number;
    results: BulkRowResult[];
};
