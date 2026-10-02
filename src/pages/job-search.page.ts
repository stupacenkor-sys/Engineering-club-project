import { Page, Locator, expect } from '@playwright/test';

const titleText =
  'Every application you send, which CV went with it, and what came back.';

export class JobSearchPage {
  //декларація змінної в середені класу page але значення не прописуемо
  readonly page: Page;
  readonly title: Locator;

  //ініціалізація классу
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', {
      name: 'Every application you send,',
    });
  }

  async verifyTitle() {
    await expect(this.title).toHaveText(titleText);
  }
}
