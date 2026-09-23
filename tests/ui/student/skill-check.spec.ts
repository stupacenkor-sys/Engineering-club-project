import { test, expect, Locator } from '@playwright/test';
import { SkillCheckPage } from '@pages/skill-check.page';
import { LoginPage } from '@pages/login.page';

// Change after the .env file is updated with the correct credentials
const STUDENT_EMAIL = process.env.STUDENT_USERNAME!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Passing skill checks by student', () => {
  test('should navigate to skill check page when clicking link', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
      await expect(page).toHaveURL(/\/login/);
    });

    await test.step('Login as student', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await expect(page).toHaveURL(/\/dashboard/);
    });

    await test.step('Go to skill check page', async () => {
      await page.getByRole('link', { name: 'Skill Checks' }).click();
      await expect(page).toHaveURL(/\/quizzes/);
    });
  });

  test('should check the filter when redirected to skill check page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const skillCheckPage = new SkillCheckPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
      await expect(page).toHaveURL(/\/login/);
    });

    await test.step('Login as student', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await expect(page).toHaveURL(/\/dashboard/);
    });

    await test.step('Go to skill check page', async () => {
      await page.getByRole('link', { name: 'Skill Checks' }).click();
      await skillCheckPage.verifyURL();
    });

    await test.step('Verify filter is on the page', async () => {
      await expect(skillCheckPage.filterContainer).toBeVisible();
      await expect(skillCheckPage.areaFilter).toBeVisible();
      await expect(skillCheckPage.levelFilter).toBeVisible();
    });
  });
});
