import { Page, Locator, expect } from '@playwright/test';

export class CommunityPage {
  readonly page: Page;
  readonly newThreadButton: Locator;
  readonly ThreadTitleInput: Locator;
  readonly PostThreadButton: Locator;
  readonly ThreadTag: Locator;
  readonly getThreadTitle: Locator;
  constructor(page: Page) {
    this.page = page;
    this.newThreadButton = page.getByRole('button', { name: 'New thread' });
    this.ThreadTitleInput = page.getByRole('textbox', { name: 'Title' });
    this.ThreadTag = page.getByRole('textbox', { name: 'Tag' });
    this.PostThreadButton = page.getByRole('button', { name: 'Post thread' });
    this.getThreadTitle = page.getByRole('heading', { level: 2 });
  }

  async gotoCommunityPage() {
    await this.page.goto('/community');
  }

  async clickCreateNewThreadButton() {
    await this.newThreadButton.click();
  }
  async fillThreadTitle(title: string) {
    await this.ThreadTitleInput.fill(title);
  }
  async fillThreadTag(tag: string) {
    await this.ThreadTag.fill(tag);
  }
  async clickPostThreadButton() {
    await this.PostThreadButton.click();
  }

 

  async verifyThreadTitleMatchesEntered(title: string) {
    await expect(this.getThreadTitle).toHaveText(title);
  }


}
