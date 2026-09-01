import { test, expect } from "@playwright/test";

test("new learner is gated by a wrong knowledge check then unlocked", async ({ page }) => {
  await page.goto("/onboarding");
  for (let i = 0; i < 7; i++) {
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await page.getByRole("button", { name: /Start lesson 1/i }).click();
  await expect(page).toHaveURL(/foundation/);
  await page.goto("/course/foundation/what-a-plus-is");
  await expect(page.getByText("Knowledge check")).toBeVisible();
  const options = page.locator("section").filter({ hasText: "Knowledge check" }).getByRole("button");
  await options.first().click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/Correct|Why|Internal|must pass/i)).toBeVisible();
});
