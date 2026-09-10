import { test, expect } from '@playwright/test';

test.describe('Public pages for guests', () => {
  test('Guest has access to courses and path', async ({ page }) => {
    await page.goto('/courses');
    await expect(page).toHaveURL(/\/courses/);

    await page.goto('/path');
    await expect(page).toHaveURL(/\/path/);
  });
});