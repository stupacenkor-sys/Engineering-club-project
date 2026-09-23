import { test, expect } from '@playwright/test';
import { SkillCheckPage } from '@pages/skill-check.page';
import { LoginPage } from '@pages/login.page';
import { DashBoardPage } from '@pages/dashboard.page';

// Change after the .env file is updated with the correct credentials
const STUDENT_EMAIL = process.env.STUDENT_USERNAME!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Passing skill checks by student', () => {
  test('should navigate to skill check page when clicking link', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const skillCheckPage = new SkillCheckPage(page);
    const dashboardPage = new DashBoardPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Login as student', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await dashboardPage.verifySelfURL();
    });

    await test.step('Go to skill check page', async () => {
      await page.getByRole('link', { name: 'Skill Checks' }).click();
      await skillCheckPage.verifySelfURL();
    });
  });

  test('should check the filter when redirected to skill check page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const skillCheckPage = new SkillCheckPage(page);
    const dashboardPage = new DashBoardPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Login as student', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await dashboardPage.verifySelfURL();
    });

    await test.step('Go to skill check page', async () => {
      await page.getByRole('link', { name: 'Skill Checks' }).click();
      await skillCheckPage.verifySelfURL();
    });

    await test.step('Verify filter is on the page', async () => {
      await expect(skillCheckPage.filterContainer).toBeVisible();
      await expect(skillCheckPage.areaFilter).toBeVisible();
      await expect(skillCheckPage.levelFilter).toBeVisible();
    });
  });
});
