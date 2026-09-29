import { Page, Locator, expect } from '@playwright/test';
export class MessagesPage {
  readonly page: Page;
  readonly newMessagesButton: Locator;
  readonly searchUsersInput: Locator;
  readonly newMessageModal: Locator;
  readonly userSearchResults: Locator;
  constructor(page: Page) {
    this.page = page;
    this.newMessagesButton = page.getByRole('button', { name: 'New message' });
    this.searchUsersInput = page.getByRole('searchbox', {
      name: 'Search by name or email…',
    });
    this.newMessageModal = page.getByRole('dialog', { name: 'New message' });
    this.userSearchResults = page.getByRole('option');
  }

  async gotoMessagesPage() {
    await this.page.goto('/messages');
  }

  async clickNewMessagesButton() {
    await this.newMessagesButton.click();
    await expect(this.newMessageModal).toBeVisible();
  }

  async searchUsers(query: string) {
    await this.searchUsersInput.fill(query);
    await expect(this.userSearchResults).toContainText(query);
  }

  async startConversationWith() {
    await this.userSearchResults.click()
  }
}
