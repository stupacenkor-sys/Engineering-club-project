import { expect, Locator, Page } from '@playwright/test';

export class MyProgressPage {
  readonly page: Page;
  readonly titleProfileName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleProfileName = page.getByRole('heading', {
      name: 'Maria Kovalenko',
    });
  }

  async goto() {
    await this.page.goto('/profile');
  }

  async verifyPage() {
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async verifyTitle(name: string) {
    await expect(this.titleProfileName).toContainText(name);
  }
}
