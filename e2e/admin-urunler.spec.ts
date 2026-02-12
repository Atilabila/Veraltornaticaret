import { expect, test, type Page } from "@playwright/test";

type BulkApiResult = {
    insertedCount: number;
    failedCount: number;
    results: Array<{
        rowIndex: number;
        status: "inserted" | "failed";
        errors: string[];
        insertedId?: string;
    }>;
};

async function selectFirstCategory(page: Page) {
    await page.getByTestId("category-select").click();
    await page.locator('[role="option"]').first().click();
}

test.describe("/admin/urunler bulk flow", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/admin/urunler");
        await expect(page.getByTestId("bulk-urunler-page")).toBeVisible();
        await selectFirstCategory(page);
    });

    test("geçerli 3 satır yapıştır -> kaydet -> başarı ve listede görünür", async ({ page }) => {
        const apiResponse: BulkApiResult = {
            insertedCount: 3,
            failedCount: 0,
            results: [
                { rowIndex: 2, status: "inserted", errors: [], insertedId: "p-1" },
                { rowIndex: 3, status: "inserted", errors: [], insertedId: "p-2" },
                { rowIndex: 4, status: "inserted", errors: [], insertedId: "p-3" },
            ],
        };

        await page.route("**/api/admin/urunler/bulk", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(apiResponse),
            });
        });

        await page.getByTestId("open-paste-dialog-button").click();
        await page.getByTestId("paste-textarea").fill(
            [
                "Ürün ismi\tFiyat\tGörsel URL\tAçıklama\tÖ1\tÖ2\tÖ3\tÖ4",
                "Poster A\t350,50\thttps://example.com/a.jpg\tAciklama A\tM1\tM2\tM3\tM4",
                "Poster B\t450\thttps://example.com/b.jpg\tAciklama B\tX1\tX2\tX3\tX4",
                "Poster C\t500.00\thttps://example.com/c.jpg\tAciklama C\tY1\tY2\tY3\tY4",
            ].join("\n")
        );
        await page.getByTestId("paste-apply-button").click();

        await expect(page.getByTestId("row-2-name")).toHaveValue("Poster A");
        await expect(page.getByTestId("row-3-name")).toHaveValue("Poster B");
        await expect(page.getByTestId("row-4-name")).toHaveValue("Poster C");

        await page.getByTestId("bulk-save-button").click();

        await expect(page.getByTestId("bulk-global-success")).toContainText(
            "3 satır kaydedildi, 0 satır başarısız."
        );
        await expect(page.locator('[data-testid$="-status-inserted"]')).toHaveCount(3);
    });

    test("1 satırda fiyat hatalı -> UI kırmızı ve backend satır hata mapi görünür", async ({ page }) => {
        let callCount = 0;
        const apiResponse: BulkApiResult = {
            insertedCount: 0,
            failedCount: 1,
            results: [
                { rowIndex: 1, status: "failed", errors: ["INVALID_PRICE_FORMAT"] },
            ],
        };

        await page.route("**/api/admin/urunler/bulk", async (route) => {
            callCount += 1;
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(apiResponse),
            });
        });

        await page.getByTestId("row-1-name").fill("Hata Test Ürün");
        await page.getByTestId("row-1-price").fill("abc");
        await page.getByTestId("row-1-image").fill("https://example.com/a.jpg");

        await expect(page.getByTestId("bulk-row-1")).toHaveClass(/bg-red-50\/60/);
        await page.getByTestId("bulk-save-button").click();

        await expect(page.getByTestId("bulk-global-error")).toContainText(
            "Kaydetmeden önce kırmızı satırlardaki hataları düzeltin."
        );
        expect(callCount).toBe(0);

        await page.getByTestId("row-1-price").fill("100");
        await page.getByTestId("bulk-save-button").click();

        expect(callCount).toBe(1);
        await expect(page.getByTestId("row-1-status-error")).toContainText("Hata (1)");
    });

    test("image URL boş ise kaydetme engellenir", async ({ page }) => {
        let callCount = 0;
        await page.route("**/api/admin/urunler/bulk", async (route) => {
            callCount += 1;
            await route.continue();
        });

        await page.getByTestId("row-1-name").fill("Gorselsiz Ürün");
        await page.getByTestId("row-1-price").fill("250");
        await page.getByTestId("bulk-save-button").click();

        await expect(page.getByTestId("bulk-global-error")).toContainText(
            "Kaydetmeden önce kırmızı satırlardaki hataları düzeltin."
        );
        await expect(page.getByTestId("row-1-image")).toHaveClass(/border-red-400/);
        expect(callCount).toBe(0);
    });
});
