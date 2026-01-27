"use server"

import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { requireAdmin } from "@/lib/auth/requireAdmin"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

export type InstagramPost = {
    id: string
    image_url: string
    permalink?: string
    caption?: string
    likes?: number
    display_order: number
    is_active: boolean
}

/**
 * Robust helper to get site content using admin client.
 * Using admin client bypasses RLS to ensure we don't accidentally wipe data due to read failures.
 */
async function getFullSiteContent() {
    const admin = createAdminSupabaseClient()
    const { data, error } = await admin
        .from('site_content' as any)
        .select('data')
        .eq('key', 'main_config')
        .maybeSingle()

    if (error) {
        console.error("Error fetching site content:", error)
    }

    return (data as any)?.data || {}
}

/**
 * Robust helper to save site content using admin client.
 */
async function saveFullSiteContent(content: any) {
    const admin = createAdminSupabaseClient()
    const { error } = await admin
        .from('site_content' as any)
        .upsert({
            key: 'main_config',
            data: content,
            updated_at: new Date().toISOString()
        } as any, { onConflict: 'key' })

    return error
}

export async function getInstagramFeed() {
    const content = await getFullSiteContent()
    const posts: InstagramPost[] = content.instagramPosts || []
    return posts.filter(p => p.is_active).sort((a, b) => a.display_order - b.display_order)
}

export async function getAllInstagramPosts() {
    try {
        await requireAdmin()
        const content = await getFullSiteContent()
        const posts: InstagramPost[] = content.instagramPosts || []
        const sorted = [...posts].sort((a, b) => a.display_order - b.display_order)
        return { success: true, data: sorted }
    } catch (e: any) {
        console.error("Error in getAllInstagramPosts:", e)
        return { success: false, error: e.message }
    }
}

export async function addInstagramPost(post: Partial<InstagramPost>) {
    try {
        await requireAdmin()
        const content = await getFullSiteContent()
        const currentPosts: InstagramPost[] = content.instagramPosts || []

        const newPost: InstagramPost = {
            id: post.id || crypto.randomUUID(),
            image_url: post.image_url!,
            permalink: post.permalink || "https://instagram.com/veralteneketicaret",
            caption: post.caption || "",
            likes: post.likes || 0,
            display_order: post.display_order ?? currentPosts.length,
            is_active: post.is_active ?? true
        }

        const updatedPosts = [...currentPosts, newPost]

        const error = await saveFullSiteContent({ ...content, instagramPosts: updatedPosts })
        if (error) throw new Error(error.message)

        revalidatePath("/")
        return { success: true }
    } catch (e: any) {
        console.error("Error in addInstagramPost:", e)
        return { success: false, error: e.message }
    }
}

export async function updateInstagramPost(id: string, updates: Partial<InstagramPost>) {
    try {
        await requireAdmin()
        const content = await getFullSiteContent()
        const currentPosts: InstagramPost[] = content.instagramPosts || []

        const updatedPosts = currentPosts.map(p =>
            p.id === id ? { ...p, ...updates } : p
        )

        const error = await saveFullSiteContent({ ...content, instagramPosts: updatedPosts })
        if (error) throw new Error(error.message)

        revalidatePath("/")
        return { success: true }
    } catch (e: any) {
        console.error("Error in updateInstagramPost:", e)
        return { success: false, error: e.message }
    }
}

export async function deleteInstagramPost(id: string) {
    try {
        await requireAdmin()
        const content = await getFullSiteContent()
        const currentPosts: InstagramPost[] = content.instagramPosts || []

        const updatedPosts = currentPosts.filter(p => p.id !== id)

        const error = await saveFullSiteContent({ ...content, instagramPosts: updatedPosts })
        if (error) throw new Error(error.message)

        revalidatePath("/")
        return { success: true }
    } catch (e: any) {
        console.error("Error in deleteInstagramPost:", e)
        return { success: false, error: e.message }
    }
}
