import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { SettingsPage } from '@pages/settings.page';
import { DashBoardPage } from '@pages/dashboard.page';
import { studentData, updatedProfileData } from '../../../src/test-data/users';

// Change after the .env file is updated with the correct credentials
const STUDENT_EMAIL = process.env.STUDENT_USERNAME!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Account Settings', () => {
  test('should have access to settings page when student is authenticated', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const settingsPage = new SettingsPage(page);
    const dashboardPage = new DashboardPage(page);

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

  test.describe('Authenticated student', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashBoardPage(page);
      const settingsPage = new SettingsPage(page);

      await loginPage.goto();
      await loginPage.verifySelfURL();

      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
      await dashboardPage.verifySelfURL();

      await settingsPage.goto();
      await settingsPage.verifySelfURL();
    });

    test('should display current student data on settings page', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await settingsPage.verifyProfileData(studentData);
    });

    test('should display avatar on settings page', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      await settingsPage.verifyAvatarDisplayed(studentData.avatar);
    });

    test('should change avatar when valid value is saved', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      const newAvatar = 'MM';

      await test.step('Change avatar', async () => {
        await settingsPage.changeAvatar(newAvatar);
      });

      await test.step('Save changes', async () => {
        await settingsPage.saveChanges();
      });

      await test.step('Verify avatar is displayed', async () => {
        await settingsPage.verifyAvatarDisplayed(newAvatar);
      });

      await test.step('Restore original avatar', async () => {
        await settingsPage.changeAvatar(studentData.avatar);
        await settingsPage.saveChanges();
      });

      await test.step('Verify original avatar is restored', async () => {
        await settingsPage.verifyAvatarDisplayed(studentData.avatar);
      });
    });

    test('should accept avatar with 1 to 3 letters and reject additional letters', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      const validAvatars = ['A', 'AB', 'ABC'];

      for (const avatar of validAvatars) {
        await test.step(`Enter avatar with ${avatar.length} letter(s)`, async () => {
          await settingsPage.typeAvatar(avatar);
          await settingsPage.verifyAvatarInputValue(avatar);
        });
      }

      await test.step('Try to enter more than three letters', async () => {
        await settingsPage.typeAvatar('ABCD');
        await settingsPage.verifyAvatarInputValue('ABC');
      });
    });

    test('should save updated profile data after page reload', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      try {
        await test.step('Update profile fields', async () => {
          await settingsPage.updateProfile(updatedProfileData);
        });

        await test.step('Save changes', async () => {
          await settingsPage.saveChanges();
          await settingsPage.verifySaved();
        });

        await test.step('Reload settings page', async () => {
          await page.reload();
          await settingsPage.verifySelfURL();
        });

        await test.step('Verify updated profile data is displayed', async () => {
          await settingsPage.verifyProfileData(updatedProfileData);
          await settingsPage.verifyAvatarDisplayed(updatedProfileData.avatar);
        });
      } finally {
        await test.step('Restore original profile data', async () => {
          await settingsPage.updateProfile(studentData);
          await settingsPage.saveChanges();
          await settingsPage.verifySaved();
        });
      }

      await test.step('Verify original data is restored', async () => {
        await page.reload();
        await settingsPage.verifyProfileData(studentData);
        await settingsPage.verifyAvatarDisplayed(studentData.avatar);
      });
    });

    test('should reject invalid email format and not save changes', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Enter invalid email and try to save', async () => {
        await settingsPage.emailInput.fill('test');
        await settingsPage.saveChanges();
      });

      await test.step('Verify validation message is displayed', async () => {
        const message = await settingsPage.getEmailValidationMessage();

        expect(message).not.toBe('');
      });

      await test.step('Verify settings were not saved', async () => {
        await page.reload();

        await expect(settingsPage.emailInput).toHaveValue(studentData.email);
      });
    });
  });
});
