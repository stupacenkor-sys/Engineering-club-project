import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;

  readonly fullNameInput: Locator;

  readonly emailInput: Locator;

  readonly currentRoleInput: Locator;

  readonly targetRoleInput: Locator;

  readonly bioInput: Locator;

  readonly avatarInput: Locator;

  readonly saveChangesButton: Locator;

  readonly savedText: Locator;

  readonly homeworkReviewCheckbox: Locator;

  readonly homeworkReviewLabel: Locator;

  readonly mentoringReminderCheckbox: Locator;

  readonly mentoringReminderLabel: Locator;

  readonly streakNudgeCheckbox: Locator;

  readonly streakNudgeLabel: Locator;

  readonly communityRepliesCheckbox: Locator;
  
  readonly communityRepliesLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByRole('textbox', { name: 'Full name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.currentRoleInput = page.getByRole('textbox', { name: 'Current role' });
    this.targetRoleInput = page.getByRole('textbox', { name: 'Target role' });
    this.bioInput = page.getByRole('textbox', { name: 'Bio' });
    this.avatarInput = page.getByRole('textbox', { name: 'Avatar' });
    this.saveChangesButton = page.getByRole('button', { name: 'Save changes' });
    this.savedText = page.getByText('Saved', { exact: true });

    this.homeworkReviewCheckbox = page.locator(
      'input[name="notifyHomeworkReview"]',
    );
    this.homeworkReviewLabel = page
      .locator('label')
      .filter({ hasText: 'Homework review completed' });

    this.mentoringReminderCheckbox = page.locator(
      'input[name="notifyMentoringReminders"]',
    );
    this.mentoringReminderLabel = page
      .locator('label')
      .filter({ hasText: 'Mentoring session reminders (24 h before)' });

    this.streakNudgeCheckbox = page.locator('input[name="notifyStreakNudge"]');
    this.streakNudgeLabel = page
      .locator('label')
      .filter({ hasText: 'Streak about to break (20:00 nudge)' });

    this.communityRepliesCheckbox = page.locator(
      'input[name="notifyCommunityReplies"]',
    );
    this.communityRepliesLabel = page
      .locator('label')
      .filter({ hasText: 'Community replies to my threads' });
  }

  async goto() {
    await this.page.goto('/settings');
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/settings/);
  }

  async saveChanges() {
    await this.saveChangesButton.click();
  }

  async saveChangesAndWait() {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().endsWith('/settings') &&
        response.request().method() === 'POST',
    );

    await this.saveChanges();

    const response = await responsePromise;

    expect(response.ok()).toBeTruthy();
  }

  getAvatar(avatar: string): Locator {
    return this.page.getByRole('main').getByText(avatar, { exact: true });
  }

  async verifyAvatarDisplayed(avatar: string) {
    await expect(this.getAvatar(avatar)).toBeVisible();
  }

  async changeAvatar(avatar: string) {
    await this.avatarInput.fill(avatar);
  }

  async verifyProfileData(userData: {
    fullName: string;
    email: string;
    currentRole: string;
    targetRole: string;
    bio: string;
  }) {
    await expect(this.fullNameInput).toHaveValue(userData.fullName);
    await expect(this.emailInput).toHaveValue(userData.email);
    await expect(this.currentRoleInput).toHaveValue(userData.currentRole);
    await expect(this.targetRoleInput).toHaveValue(userData.targetRole);
    await expect(this.bioInput).toHaveValue(userData.bio);
  }

  async typeAvatar(avatar: string) {
    await this.avatarInput.fill('');
    await this.avatarInput.pressSequentially(avatar);
  }

  async verifyAvatarInputValue(avatar: string) {
    await expect(this.avatarInput).toHaveValue(avatar);
  }

  async updateProfile(data: {
    avatar: string;
    fullName: string;
    email: string;
    currentRole: string;
    targetRole: string;
    bio: string;
  }) {
    await this.avatarInput.fill(data.avatar);
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentRoleInput.fill(data.currentRole);
    await this.targetRoleInput.fill(data.targetRole);
    await this.bioInput.fill(data.bio);
  }

  async verifySaved() {
    await expect(this.savedText).toBeVisible();
  }

  async getEmailValidationMessage(): Promise<string> {
    return this.emailInput.evaluate(
      (input: HTMLInputElement) => input.validationMessage,
    );
  }

  getWeeklyGoalOption(hours: string): Locator {
    return this.page
      .locator('label')
      .filter({ hasText: new RegExp(`^${hours} h$`) });
  }

  getWeeklyGoalRadio(hours: string): Locator {
    return this.getWeeklyGoalOption(hours).locator('input[type="radio"]');
  }

  async selectWeeklyGoal(hours: string) {
    await this.getWeeklyGoalOption(hours).click();
  }

  async verifyWeeklyGoalSelected(hours: string) {
    await expect(this.getWeeklyGoalRadio(hours)).toBeChecked();
  }

  async setHomeworkReviewNotification(enabled: boolean) {
    const isChecked = await this.homeworkReviewCheckbox.isChecked();

    if (isChecked !== enabled) {
      await this.homeworkReviewLabel.click();
    }
  }

  async verifyHomeworkReviewNotificationChecked() {
    await expect(this.homeworkReviewCheckbox).toBeChecked();
  }

  async verifyHomeworkReviewNotificationUnchecked() {
    await expect(this.homeworkReviewCheckbox).not.toBeChecked();
  }

  async setMentoringReminderNotification(enabled: boolean) {
    const isChecked = await this.mentoringReminderCheckbox.isChecked();

    if (isChecked !== enabled) {
      await this.mentoringReminderLabel.click();
    }
  }

  async verifyMentoringReminderNotificationChecked() {
    await expect(this.mentoringReminderCheckbox).toBeChecked();
  }

  async verifyMentoringReminderNotificationUnchecked() {
    await expect(this.mentoringReminderCheckbox).not.toBeChecked();
  }

  async setStreakNudgeNotification(enabled: boolean) {
    const isChecked = await this.streakNudgeCheckbox.isChecked();

    if (isChecked !== enabled) {
      await this.streakNudgeLabel.click();
    }
  }
  async verifyStreakNudgeNotificationChecked() {
    await expect(this.streakNudgeCheckbox).toBeChecked();
  }

  async verifyStreakNudgeNotificationUnchecked() {
    await expect(this.streakNudgeCheckbox).not.toBeChecked();
  }

  async setCommunityRepliesNotification(enabled: boolean) {
    const isChecked = await this.communityRepliesCheckbox.isChecked();

    if (isChecked !== enabled) {
      await this.communityRepliesLabel.click();
    }
  }
  async verifyCommunityRepliesNotificationChecked() {
    await expect(this.communityRepliesCheckbox).toBeChecked();
  }

  async verifyCommunityRepliesNotificationUnchecked() {
    await expect(this.communityRepliesCheckbox).not.toBeChecked();
  }
}
