import { test, expect } from "@playwright/test";

test.describe("cart off", () => {
  test("/sepet redirects to /teklif-al", async ({ page }) => {
    await page.goto("/sepet");
    await expect(page).toHaveURL(/\/teklif-al/);
  });

  test("/odeme redirects to /teklif-al", async ({ page }) => {
    await page.goto("/odeme");
    await expect(page).toHaveURL(/\/teklif-al/);
  });

  test("homepage has no Sepet aria control", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Sepet" })).toHaveCount(0);
  });
});
