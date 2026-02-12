import { defineConfig, devices } from "@playwright/test";

const placeholderAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: false,
    reporter: [["list"]],
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "on-first-retry",
    },
    webServer: {
        command: `cross-env E2E_ADMIN_BYPASS=1 NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=${placeholderAnonKey} npm run dev -- --port 4173`,
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true,
        timeout: 120_000,
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
