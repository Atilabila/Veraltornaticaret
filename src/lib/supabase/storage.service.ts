import { createClient } from "@supabase/supabase-js";

export const uploadImage = async (file: File, path?: string): Promise<string> => {
    const supabaseStr = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const keyStr = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseStr || !keyStr) throw new Error("Supabase keys missing");

    const supabase = createClient(supabaseStr, keyStr);

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
        .from('products')
        .upload(filePath, file);

    if (error) {
        throw new Error(error.message);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

    return publicUrl;
};
