import { expect, test } from "@playwright/test";

const publicPages = [
  { heading: "Events", path: "/events" },
  { heading: "MSA Blog", path: "/blog" },
  { heading: "Prayer Information", path: "/prayerinfo" },
];

test("homepage loads", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(/WLU MSA/i);
  await expect(
    page.getByRole("heading", { name: "Join Our Community!" })
  ).toBeVisible();
});

for (const { heading, path } of publicPages) {
  test(`${path} loads`, async ({ page }) => {
    const response = await page.goto(path);

    expect(response?.ok()).toBe(true);
    await expect(
      page.getByRole("heading", { level: 1, name: heading })
    ).toBeVisible();
  });
}

test("mobile navigation opens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.getByRole("button", {
    name: "Toggle mobile menu",
  });

  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-nav")).toBeVisible();
});
