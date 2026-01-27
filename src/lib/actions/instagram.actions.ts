"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type InstagramPost = {
    id: string
    image_url: string
    permalink?: string
    caption?: string
    likes?: number
    display_order: number
    is_active: boolean
}

export async function getInstagramFeed() {
    const supabase = await createClient()

    // First try to fetch from DB
    const { data, error } = await supabase
        .from("instagram_feed")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })

    if (error) {
        console.error("Error fetching feed:", error)
        return []
    }

    return data as InstagramPost[]
}

export async function getAllInstagramPosts() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("instagram_feed")
        .select("*")
        .order("display_order", { ascending: true })

    if (error) {
        return { success: false, error: error.message }
    }
    return { success: true, data: data as InstagramPost[] }
}

export async function addInstagramPost(post: Partial<InstagramPost>) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("instagram_feed")
        .insert([{
            image_url: post.image_url,
            permalink: post.permalink,
            caption: post.caption,
            likes: post.likes || 0,
            display_order: post.display_order || 0,
            is_active: post.is_active ?? true
        }])

    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true }
}

export async function updateInstagramPost(id: string, updates: Partial<InstagramPost>) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("instagram_feed")
        .update(updates)
        .eq("id", id)

    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true }
}

export async function deleteInstagramPost(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("instagram_feed")
        .delete()
        .eq("id", id)

    if (error) return { success: false, error: error.message }
    revalidatePath("/")
    return { success: true }
}
