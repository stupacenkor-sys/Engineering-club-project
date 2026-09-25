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
}
