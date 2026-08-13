"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const MAX_QUOTE_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_QUOTE_EXTENSIONS = new Set([
    "pdf",
    "jpg",
    "jpeg",
    "png",
    "webp",
    "zip",
    "dwg",
    "dxf",
    "step",
    "stp",
]);

export interface QuoteSubmissionData {
    fullName: string;
    company?: string;
    email: string;
    phone: string;
    serviceType: string;
    description: string;
    quantity?: string;
    materialType?: string;
    files?: {
        name: string;
        type: string;
        size: number;
        url: string;
        path: string;
    }[];
}

export async function submitQuote(data: QuoteSubmissionData) {
    const supabase = createAdminSupabaseClient();

    // Generate quote number: QTE-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const quoteNumber = `QTE-${dateStr}-${randomStr}`;

    try {
        // 1. Insert into quotes table
        const { data: quote, error: quoteError } = await (supabase
            .from("quotes") as any)
            .insert({
                quote_number: quoteNumber,
                full_name: data.fullName,
                company: data.company,
                email: data.email,
                phone: data.phone,
                service_type: data.serviceType,
                description: data.description,
                estimated_quantity: data.quantity,
                material_type: data.materialType,
                status: "pending"
            })
            .select()
            .single();

        if (quoteError) {
            console.error("[QUOTE] Insert error:", quoteError);
            return { success: false, error: "Talebiniz kaydedilirken bir hata oluştu." };
        }

        // 2. Insert attachments if any
        if (data.files && data.files.length > 0) {
            const attachments = data.files.map(file => ({
                quote_id: (quote as any).id,
                file_path: file.path,
                file_name: file.name,
                file_type: file.type,
                file_size: file.size
            }));

            const { error: attachError } = await (supabase
                .from("quote_attachments") as any)
                .insert(attachments);

            if (attachError) {
                console.warn("[QUOTE] Attachment insert error (non-fatal):", attachError);
            }
        }

        return { success: true, quoteNumber };
    } catch (error) {
        console.error("[QUOTE] Unexpected error:", error);
        return { success: false, error: "Beklenmedik bir hata oluştu." };
    }
}

/**
 * Public quote attachment upload. Must not use requireAdmin —
 * visitors submit quotes without an admin session.
 */
export async function uploadQuoteAttachment(formData: FormData): Promise<{
    success: boolean;
    url?: string;
    error?: string;
}> {
    try {
        const file = formData.get("file");
        if (!(file instanceof File) || file.size === 0) {
            return { success: false, error: "Dosya bulunamadı." };
        }

        if (file.size > MAX_QUOTE_FILE_BYTES) {
            return { success: false, error: "Dosya 10MB sınırını aşıyor." };
        }

        const extension = (file.name.split(".").pop() || "").toLowerCase();
        if (!ALLOWED_QUOTE_EXTENSIONS.has(extension)) {
            return { success: false, error: "Bu dosya türü kabul edilmiyor." };
        }

        const supabase = createAdminSupabaseClient();
        const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
        const filePath = `quotes/${fileName}`;

        const { error } = await supabase.storage
            .from("ürünler")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            console.error("[QUOTE] Upload error:", error);
            return { success: false, error: "Dosya yüklenemedi." };
        }

        const { data: urlData } = supabase.storage
            .from("ürünler")
            .getPublicUrl(filePath);

        return { success: true, url: urlData.publicUrl };
    } catch (error) {
        console.error("[QUOTE] Upload unexpected error:", error);
        return { success: false, error: "Dosya yüklenirken bir hata oluştu." };
    }
}
