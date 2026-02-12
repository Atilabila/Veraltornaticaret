import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import {
    insertBulkAdminUrunler,
    validateBulkRequestPayload,
} from "@/lib/services/admin-urunler-bulk.service";
import type { AdminUrunlerBulkResponse } from "@/lib/urunler-bulk/types";

export async function POST(request: Request) {
    try {
        await requireAdmin();
    } catch (error) {
        const message = error instanceof Error ? error.message : "FORBIDDEN";
        if (message === "UNAUTHENTICATED") {
            return NextResponse.json(
                { error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: { code: "FORBIDDEN", message: "Admin access required." } },
            { status: 403 }
        );
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json(
            { error: { code: "INVALID_PAYLOAD", message: "Request body must be valid JSON." } },
            { status: 400 }
        );
    }

    const validation = validateBulkRequestPayload(payload);
    if (!validation.ok) {
        return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    try {
        const result = await insertBulkAdminUrunler(validation.payload);
        return NextResponse.json<AdminUrunlerBulkResponse>(result, { status: 200 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unexpected error while processing bulk insert.";

        return NextResponse.json(
            { error: { code: "INTERNAL_ERROR", message } },
            { status: 500 }
        );
    }
}
