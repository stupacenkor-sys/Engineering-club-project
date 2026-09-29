import { Page, Locator, expect } from '@playwright/test';
export class CommunityPage {
  readonly page: Page;
  readonly newThreadButton: Locator;
  readonly threadTitleInput: Locator;
  readonly postThreadButton: Locator;
  readonly threadTag: Locator;
  readonly getThreadTitle: Locator;
  readonly getThreadTag: Locator;
  readonly authoroftheThread: Locator;
  readonly writeReplyInput: Locator;
  readonly postReplyButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.newThreadButton = page.getByRole('button', { name: 'New thread' });
    this.threadTitleInput = page.getByRole('textbox', { name: 'Title' });
    this.threadTag = page.getByRole('textbox', { name: 'Tag' });
    this.postThreadButton = page.getByRole('button', { name: 'Post thread' });
    this.getThreadTitle = page.getByRole('heading', { level: 2 });
    this.getThreadTag = page.locator('span.tag.tag-accent');
    this.authoroftheThread = page.getByText('just now');
    this.writeReplyInput = page.getByRole('textbox', { name: 'Reply' })
    this.postReplyButton = page.getByRole('button', { name: 'Post reply' });

  }

  async gotoCommunityPage() {
    await this.page.goto('/community');
  }

  async verifyCommunityPageIsOpened() {
    await expect(this.page).toHaveURL('/community');
  }

  async clickCreateNewThreadButton() {
    await this.newThreadButton.click();
  }

  async fillThreadTitle(title: string) {
    await this.threadTitleInput.fill(title);
  }

  async fillThreadTag(tag: string) {
    await this.threadTag.fill(tag);
  }
  async clickPostThreadButton() {
    await this.postThreadButton.click();
  }

  async verifyThreadTitleMatchesEntered(title: string) {
    await expect(this.getThreadTitle).toHaveText(title);
  }
  async verifyThreadTagMatchesEntered(tag: string) {
    await expect(this.page).toHaveURL(/\/community\/[^/]+$/);
    await expect(this.getThreadTag).toHaveText(tag);
  }
  async verifyThreadAuthorIsCurrentUser(Name: string) {
    await expect(this.page).toHaveURL(/\/community\/[^/]+$/);
    let threadAuthor = ((await this.authoroftheThread.textContent()) ?? '')
      .split(' · ')[0]
      .trim();

    expect(threadAuthor).toBe(Name);
  }
  async postreply(Reply: string) {
    this.writeReplyInput.fill(Reply);
    this.postReplyButton.click();
  }
}
