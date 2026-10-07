import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { SettingsPage } from '@pages/settings.page';
import { DashboardPage } from '@pages/dashboard.page';
import { studentData, updatedProfileData } from '../../../src/test-data/users';

const STUDENT_EMAIL = process.env.STUDENT_EMAIL!;
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
    test.describe.configure({ mode: 'serial' });

    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
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

      await settingsPage.ensureProfileData(studentData)

      await settingsPage.verifyProfileData(studentData);
    });

    test('should display avatar on settings page', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Reset avatar state', async () => {
        await settingsPage.ensureAvatar(studentData.avatar);
      });

      await settingsPage.verifyAvatarDisplayed(studentData.avatar);
    });

    test('should change avatar when valid value is saved', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      const newAvatar = 'DD';

      await test.step('Reset avatar state', async () => {
        await settingsPage.ensureAvatar(studentData.avatar);
      });

      try {
        await test.step('Change avatar', async () => {
          await settingsPage.changeAvatar(newAvatar);
        });

        await test.step('Save changes', async () => {
          await settingsPage.saveChangesAndWait();
        });

        await test.step('Verify avatar is displayed', async () => {
          await settingsPage.verifyAvatarDisplayed(newAvatar);
        });
      } finally {
        await test.step('Restore original avatar', async () => {
          await page.reload();

          await settingsPage.changeAvatar(studentData.avatar);
          await settingsPage.saveChangesAndWait();
        });

        await test.step('Verify original avatar is restored', async () => {
          await page.reload();

          await settingsPage.verifyAvatarInputValue(studentData.avatar);
          await settingsPage.verifyAvatarDisplayed(studentData.avatar);
        });
      }
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

      await settingsPage.ensureProfileData(studentData);

      try {
        await test.step('Update profile fields', async () => {
          await settingsPage.updateProfile(updatedProfileData);
        });

        await test.step('Save changes', async () => {
          await settingsPage.saveChangesAndWait();
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
          await settingsPage.saveChangesAndWait();
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

    test('should select weekly study goal', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Select weekly study goal', async () => {
        await settingsPage.selectWeeklyGoal('8');
      });

      await test.step('Verify weekly study goal is selected', async () => {
        await settingsPage.verifyWeeklyGoalSelected('8');
      });
    });

    test('should save selected learning preferences', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      const originalWeeklyGoal = '4';
      const newWeeklyGoal = '8';

      await test.step('Select weekly study goal', async () => {
        await settingsPage.selectWeeklyGoal('8');
      });

      await test.step('Save changes', async () => {
        await settingsPage.saveChangesAndWait();
      });

      await test.step('Verify weekly study goal is saved', async () => {
        await page.reload();

        await settingsPage.verifyWeeklyGoalSelected(newWeeklyGoal);
      });

      await test.step('Restore original weekly study goal', async () => {
        await settingsPage.selectWeeklyGoal(originalWeeklyGoal);
        await settingsPage.saveChangesAndWait();
      });

      await test.step('Verify original weekly study goal is restored', async () => {
        await page.reload();
        await settingsPage.verifyWeeklyGoalSelected(originalWeeklyGoal);
      });
    });

    test('should enable and disable homework review notification', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Disable homework review notification', async () => {
        await settingsPage.setHomeworkReviewNotification(false);
        await settingsPage.verifyHomeworkReviewNotificationUnchecked();
      });

      await test.step('Enable homework review notification', async () => {
        await settingsPage.setHomeworkReviewNotification(true);
        await settingsPage.verifyHomeworkReviewNotificationChecked();
      });
    });

    test('should enable and disable mentoring session reminder notification', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Enable mentoring session reminder notification', async () => {
        await settingsPage.setMentoringReminderNotification(true);
        await settingsPage.verifyMentoringReminderNotificationChecked();
      });

      await test.step('Disable mentoring session reminder notification', async () => {
        await settingsPage.setMentoringReminderNotification(false);
        await settingsPage.verifyMentoringReminderNotificationUnchecked();
      });
    });

    test('should enable and disable streak nudge notification', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Disable streak nudge notification', async () => {
        await settingsPage.setStreakNudgeNotification(false);
        await settingsPage.verifyStreakNudgeNotificationUnchecked();
      });

      await test.step('Enable streak nudge notification', async () => {
        await settingsPage.setStreakNudgeNotification(true);
        await settingsPage.verifyStreakNudgeNotificationChecked();
      });
    });

    test('should enable and disable community replies notification', async ({
      page,
    }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Enable community replies notification', async () => {
        await settingsPage.setCommunityRepliesNotification(true);
        await settingsPage.verifyCommunityRepliesNotificationChecked();
      });

      await test.step('Disable community replies notification', async () => {
        await settingsPage.setCommunityRepliesNotification(false);
        await settingsPage.verifyCommunityRepliesNotificationUnchecked();
      });
    });

    test('should save selected notification preferences', async ({ page }) => {
      const settingsPage = new SettingsPage(page);

      await test.step('Update notification preferences', async () => {
        await settingsPage.setHomeworkReviewNotification(false);
        await settingsPage.setMentoringReminderNotification(true);
        await settingsPage.setStreakNudgeNotification(false);
        await settingsPage.setCommunityRepliesNotification(true);
      });

      await test.step('Save changes', async () => {
        await settingsPage.saveChangesAndWait();
      });

      await test.step('Verify notification preferences are saved', async () => {
        await page.reload();

        await settingsPage.verifyHomeworkReviewNotificationUnchecked();
        await settingsPage.verifyMentoringReminderNotificationChecked();
        await settingsPage.verifyStreakNudgeNotificationUnchecked();
        await settingsPage.verifyCommunityRepliesNotificationChecked();
      });

      await test.step('Restore original notification preferences', async () => {
        await settingsPage.setHomeworkReviewNotification(true);
        await settingsPage.setMentoringReminderNotification(false);
        await settingsPage.setStreakNudgeNotification(true);
        await settingsPage.setCommunityRepliesNotification(false);

        await settingsPage.saveChangesAndWait();
      });

      await test.step('Verify original notification preferences are restored', async () => {
        await page.reload();

        await settingsPage.verifyHomeworkReviewNotificationChecked();
        await settingsPage.verifyMentoringReminderNotificationUnchecked();
        await settingsPage.verifyStreakNudgeNotificationChecked();
        await settingsPage.verifyCommunityRepliesNotificationUnchecked();
      });
    });
  });
});