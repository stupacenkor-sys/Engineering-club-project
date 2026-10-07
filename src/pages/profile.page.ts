import { Page, Locator, expect } from '@playwright/test';
export class ProfilePage {
  
  readonly page: Page;

  readonly profileName: Locator;

  constructor(page: Page) {
    this.page = page
    this.profileName = page.getByRole('heading', { level: 2 });
  }

  async gotoProfilePage() {
    await this.page.goto('/profile');
  }

  async verifySelfProfileURL() {
    await expect(this.page).toHaveURL(/\/profile/);
  }
}