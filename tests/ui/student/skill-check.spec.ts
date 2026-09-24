import { test, expect } from '@playwright/test';
import { SkillCheckPage } from '@pages/skill-check.page';
import { LoginPage } from '@pages/login.page';
import { Sidebar } from '@pages/../sidebar';

// Change after the .env file is updated with the correct credentials
const STUDENT_EMAIL = process.env.STUDENT_USERNAME!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Passing skill checks by student', () => {
  test.beforeEach(
    'should navigate to skill check page when clicking link',
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const sidebar = new Sidebar(page);
      const skillCheckPage = new SkillCheckPage(page);

      await test.step('Go to login page', async () => {
        await loginPage.goto();
        await loginPage.verifySelfURL();
      });

      await test.step('Login as student', async () => {
        await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
        await sidebar.verifyDashboardURL();
      });

      await test.step('Go to skill check page', async () => {
        await sidebar.clickSkillChecksLink();
        await skillCheckPage.verifySelfURL();
      });
    },
  );

  test('should check the filter when redirected to skill check page', async ({
    page,
  }) => {
    const skillCheckPage = new SkillCheckPage(page);

    await test.step('Verify filter is on the page', async () => {
      await expect(skillCheckPage.areaFilter).toBeVisible();
      await expect(skillCheckPage.levelFilterContainer).toBeVisible();
    });
  });

  test('should check "LEVEL" filter for corect values', async ({ page }) => {
    const skillCheckPage = new SkillCheckPage(page);

    await test.step('Verify filter is on the page', async () => {
      await expect(skillCheckPage.levelFilterAllLink).toBeVisible();
      await expect(skillCheckPage.levelFilterBasicLink).toBeVisible();
      await expect(skillCheckPage.levelFilterIntermediateLink).toBeVisible();
      await expect(skillCheckPage.levelFilterAdvancedLink).toBeVisible();
    });
  });
});
