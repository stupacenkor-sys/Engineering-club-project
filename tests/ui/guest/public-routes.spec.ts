import { test, expect } from '@playwright/test';

test.describe('Public pages for guests', () => {
  test('Guest has access to courses and path', async ({ page }) => {
    await page.goto('/courses');
    await expect(page).toHaveURL(/\/courses/);

    await page.goto('/path');
    await expect(page).toHaveURL(/\/path/);
  });

  test("New format", async ({page}) => {
    await test.step("Navigate to courses URL and check", async () => {
      await page.goto('/courses');
      await expect(page).toHaveURL(/\/courses/);
    });

    await test.step("Navigate to path URL and check", async () => {
      await page.goto('/path');
      await expect(page).toHaveURL(/\/path/);
    })
  });
});