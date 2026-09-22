import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

test.describe('Admin Login', () => {
  test('should redirect to dashboard when admin logs in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
    });

    await test.step('Log in with valid admin credentials', async () => {
      await loginPage.login(process.env.ADMIN_USERNAME!, process.env.PASSWORD!);
    });

    await test.step('Verify redirect to dashboard', async () => {
      await expect(page).toHaveURL('/dashboard');
    });
  });
});
