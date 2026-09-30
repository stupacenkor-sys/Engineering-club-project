import { Page, expect } from '@playwright/test';

export class LearningPathPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getPathHeading(title: string) {
    return this.page.getByRole('main').getByRole('heading', { name: title });
  }

  async expectLearningPathOpened(title: string) {
    await this.verifySelfURL();
    await expect(this.getPathHeading(title)).toBeVisible();
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/path$/);
  }
}
