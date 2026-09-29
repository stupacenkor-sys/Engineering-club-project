import { test, expect } from '@playwright/test';
import { MessagesPage } from '@pages/messages.page';
import { LoginPage } from '@pages/login.page';
test.describe('Messages Page', () => {
  const partialName = 'And';
  test('Typing a name in the search field filters the list and the matching user appears', async ({
    page,
  }) => {
    const messagesPage = new MessagesPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Open login page and verify URL', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Log in with valid student credentials', async () => {
      await loginPage.login(process.env.STUDENT_EMAIL!, process.env.PASSWORD!);
      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('Go to Message page', async () => {
      await messagesPage.gotoMessagesPage();
    });

    await test.step('Click on the NewMessages button', async () => {
      await messagesPage.clickNewMessagesButton();
    });

    await test.step('Search user by partial name', async () => {
      await messagesPage.searchUsers(partialName);
    });
  });
});
