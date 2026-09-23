import { Page, Locator } from '@playwright/test';

export class CommunityPage {
  readonly page: Page;
  readonly NewThreadButton: Locator;
  readonly ThreadTitleInput: Locator;
  readonly PostThreadButton: Locator;
  readonly ThreadTag: Locator;
  constructor(page: Page) {
    this.page = page;
    this.NewThreadButton = page.getByRole('button', { name: 'New thread' });
    this.ThreadTitleInput = page.getByRole('textbox', { name: 'Title' });
    this.ThreadTag = page.getByRole('textbox', { name: 'Tag' });
    this.PostThreadButton = page.getByRole('button', { name: 'Post thread' })
  }

async gotocommunitypage() {
    await this.page.goto('/community');
  }

  async createNewThread(title: string, tag: string) {
    await this.NewThreadButton.click();
    await this.ThreadTitleInput.fill(title);
    await this.ThreadTag.fill(tag);
    await this.PostThreadButton.click();
  }


}