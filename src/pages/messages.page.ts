import { Page, Locator, expect } from '@playwright/test';
export class MessagesPage {
  
  readonly page: Page;

  readonly newMessagesButton: Locator;
  readonly searchUsersInput: Locator;
  readonly newMessageModal: Locator;
  readonly userSearchResults: Locator;
  readonly messageInput: Locator;
  readonly sendMessageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newMessagesButton = page.getByRole('button', { name: 'New message' });
    this.searchUsersInput = page.getByRole('searchbox', {
      name: 'Search by name or email…',
    });
    this.newMessageModal = page.getByRole('dialog', { name: 'New message' });
    this.userSearchResults = page.getByRole('option');
    this.messageInput = page.getByRole('textbox');
    this.sendMessageButton = page.getByRole('button', {
      name: 'Send',
      exact: true,
    });
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

  async openChatWith() {
    await this.userSearchResults.click();
  }

  async writeAMessage(message: string) {
    await this.messageInput.fill(message);
    await this.sendMessageButton.click();
  }
}
