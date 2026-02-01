"use server";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { v4 as uuidv4 } from "uuid";

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
