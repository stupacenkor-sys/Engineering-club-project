import { Page, Locator, expect } from '@playwright/test';

export class SkillCheckPage {
  readonly page: Page;
  readonly areaFilter: Locator;
  readonly levelFilter: Locator;
  readonly filterContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.areaFilter = page.getByText('Area', { exact: true });
    this.levelFilter = page.getByText('Level', { exact: true });
    this.filterContainer = page
      .locator('div.blueprint')
      .filter({ has: this.areaFilter })
      .filter({ has: this.levelFilter });
  }

  async verifyURL(url: string | RegExp) {
    await expect(this.page).toHaveURL(url);
  }
}
