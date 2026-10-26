import { test, expect } from "@playwright/test";

test("new learner is gated by a wrong knowledge check then unlocked", async ({ page }) => {
  await page.goto("/onboarding");
  for (let i = 0; i < 6; i++) {
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await page.getByRole("button", { name: /Start lesson 1/i }).click();
  // No orientation gate: onboarding lands directly on Core 1 lesson 1 (objective 1.1).
  await expect(page).toHaveURL(/\/course\/core-1\/domain-1\/1-1-laptop-hardware\/laptop-battery-keyboard$/);
  await expect(page.getByRole("heading", { name: "Laptop serviceability, batteries, and keyboards" })).toBeVisible();
  await expect(page.getByText("Knowledge check").first()).toBeVisible();
  const check = page
    .getByRole("region")
    .filter({ has: page.getByRole("heading", { name: /Knowledge check/ }) })
    .first();
  await check.getByRole("listitem").first().getByRole("button").click();
  await check.getByRole("button", { name: "Check answer" }).click();
  await expect(check.getByText(/Correct|Why|100%|must pass/i).first()).toBeVisible();
});

test("retired CompTIA overview URL redirects to Core 1 lesson 1", async ({ page }) => {
  await page.goto("/course/foundation/what-a-plus-is");
  await expect(page).toHaveURL(/\/course\/core-1\/domain-1\/1-1-laptop-hardware\/laptop-battery-keyboard$/);
  await expect(page.getByRole("heading", { name: "Laptop serviceability, batteries, and keyboards" })).toBeVisible();
});

test("former orientation lesson stays reachable as an optional Foundation lesson", async ({ page }) => {
  await page.goto("/course/foundation/how-the-academy-works");
  await expect(page).toHaveURL(/\/course\/foundation\/how-the-academy-works$/);
  await expect(page.getByRole("heading", { name: "How this academy forces you to learn" })).toBeVisible();
});
