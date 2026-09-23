import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { SettingsPage } from '@pages/settings.page';
import { DashBoardPage } from '@pages/dashboard.page';
import { studentData } from '../../../src/test-data/users';

// Change after the .env file is updated with the correct credentials
const STUDENT_EMAIL = process.env.STUDENT_USERNAME!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Account Settings', () => {
  test('should have access to settings page when student is authenticated', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);
    const dashboardPage = new DashBoardPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Log in with valid student credentials', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await dashboardPage.verifySelfURL();
    });

    await test.step('Open settings page', async () => {
      await settingsPage.goto();
    });

    await test.step('Verify settings page is accessible', async () => {
      await settingsPage.verifySelfURL();
    });
  });

  test('should redirect to login when student is not authenticated', async ({
    page,
  }) => {
    const settingsPage = new SettingsPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Open settings page without authentication', async () => {
      await settingsPage.goto();
    });

    await test.step('Verify redirect to login page', async () => {
      await loginPage.verifySelfURL();
    });
  });

  test('should display current student data on settings page', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashBoardPage(page);
    const settingsPage = new SettingsPage(page);

    await test.step('Open login page', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Login as student', async () => {
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await dashboardPage.verifySelfURL();
    });

    await test.step('Open settings page', async () => {
      await settingsPage.goto();
      await settingsPage.verifySelfURL();
    });

    await test.step('Verify current student data is displayed', async () => {
      await expect(settingsPage.fullNameInput).toHaveValue(
        studentData.fullName,
      );
      await expect(settingsPage.emailInput).toHaveValue(studentData.email);
      await expect(settingsPage.currentRoleInput).toHaveValue(
        studentData.currentRole,
      );
      await expect(settingsPage.targetRoleInput).toHaveValue(
        studentData.targetRole,
      );
      await expect(settingsPage.bioInput).toHaveValue(studentData.bio);
    });
  });
});
