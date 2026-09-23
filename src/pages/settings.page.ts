import { Locator, Page, expect } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentRoleInput: Locator;
  readonly targetRoleInput: Locator;
  readonly bioInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.getByRole('textbox', { name: 'Full name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.currentRoleInput = page.getByRole('textbox', { name: 'Current role' });
    this.targetRoleInput = page.getByRole('textbox', { name: 'Target role' })
    this.bioInput = page.getByRole('textbox', { name: 'Bio' });
  }

  async goto() {
    await this.page.goto('/settings');
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/settings/);
  }
}
