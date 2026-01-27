"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Sign in with email and password
 */
export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin", "layout");
    redirect("/admin");
}

/**
 * Sign in with Magic Link
 */
export async function signInWithMagicLink(formData: FormData) {
    const email = formData.get("email") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
                }/admin`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    return {
        success: true,
        message: "Giriş bağlantısı e-posta adresinize gönderildi.",
    };
}

/**
 * Sign out
 */
export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/admin", "layout");
    redirect("/admin-login");
}
