import { supabase } from './client';

export interface FileUploadResult {
    success: boolean;
    path?: string;
    error?: string;
}

/**
 * Uploads a B2B quote attachment to Supabase Storage
 * Target path: quotes/{referenceNumber}/{fileName}
 */
export async function uploadQuoteAttachment(
    referenceNumber: string,
    file: File
): Promise<FileUploadResult> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `quotes/${referenceNumber}/${fileName}`;

        const { data, error } = await supabase.storage
            .from('quote-attachments')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('[STORAGE] Upload failed:', error);
            return { success: false, error: error.message };
        }

        return {
            success: true,
            path: data.path
        };
    } catch (error) {
        console.error('[STORAGE] Unexpected error:', error);
        return { success: false, error: 'An unexpected error occurred during upload' };
    }
}

/**
 * Records attachment metadata in the database
 */
export async function recordQuoteAttachment(data: {
    quoteReference: string;
    filePath: string;
    fileName: string;
    fileType: string;
    fileSize: number;
}) {
    try {
        // 1. Get quote ID from reference
        const { data: quote, error: quoteError } = await supabase
            .from('quotes')
            .select('id')
            .eq('quote_number', data.quoteReference)
            .single();

        if (quoteError || !quote) {
            throw new Error('Quote not found for attachment record');
        }

        const quoteData = quote as any;

        // 2. Insert record
        const { error: insertError } = await (supabase
            .from('quote_attachments') as any)
            .insert({
                quote_id: quoteData.id,
                file_path: data.filePath,
                file_name: data.fileName,
                file_type: data.fileType,
                file_size: data.fileSize
            });

        if (insertError) {
            console.error('[DB] Attachment record failed:', insertError);
            return false;
        }

        return true;
    } catch (error) {
        console.error('[DB] unexpected error recording attachment:', error);
        return false;
    }
}
