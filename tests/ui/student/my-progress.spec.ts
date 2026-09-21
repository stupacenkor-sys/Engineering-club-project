import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../../../src/pages/login.page';
import { MyProgressPage } from '../../../src/pages/my-progress.page';
import { USERS, DEFAULT_PASSWORD } from '../../../src/config/users.config';

let myProgressButon: Locator;

test.describe.only('My progress page', () => {
  test('Verify my progress page ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const myProgressPage = new MyProgressPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
      await loginPage.verifyLoginPage();
    });

    await test.step('login with student creds', async () => {
      await loginPage.login(USERS.student.main.email, DEFAULT_PASSWORD);
      myProgressButon = page.getByRole('link', { name: 'My Progress' });

      await expect(myProgressButon).toBeVisible();

      await loginPage.clickLoginButton();
      await expect(page).toHaveURL(/\/dashboard/);
    });

    await test.step('Navigate to My progress page and verify', async () => {
      await myProgressButon.click();
      await myProgressPage.verifyPage();
      await myProgressPage.verifyTitle(USERS.student.main.name);
    });
  });
});
