"use server";

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

export async function listDriveFiles() {
    try {
        const base64Creds = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64;
        if (!base64Creds) {
            throw new Error("GOOGLE_DRIVE_SERVICE_ACCOUNT_BASE64 is missing in .env.local");
        }

        const credentials = JSON.parse(Buffer.from(base64Creds, 'base64').toString('utf-8'));
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        if (!credentials.client_email || !credentials.private_key) {
            throw new Error("Google Drive credentials are missing.");
        }

        if (!folderId) {
            throw new Error("Google Drive Folder ID is missing.");
        }

        const auth = new GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const response = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, thumbnailLink, webViewLink)',
            pageSize: 100,
        });

        const files = response.data.files || [];

        return {
            success: true,
            data: files.map(file => ({
                id: file.id,
                name: file.name,
                // Using the direct image format: https://lh3.googleusercontent.com/u/0/d/[ID]
                imageUrl: `https://lh3.googleusercontent.com/u/0/d/${file.id}`,
                previewUrl: `https://lh3.googleusercontent.com/u/0/d/${file.id}`
            }))
        };
    } catch (error: any) {
        console.error("Drive Sync Error:", error);
        return { success: false, error: error.message };
    }
}
