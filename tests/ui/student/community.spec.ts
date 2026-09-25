import { test, expect } from '@playwright/test';
import { CommunityPage } from '@pages/community.page';
import { LoginPage } from '@pages/login.page';

test.describe('Community page', () => {
  const threadTitle = 'Test Thread Title';
  
  test('The thread title in the list matches the entered Title exactly', async ({
    page,
  }) => {
    const communityPage = new CommunityPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Open login page and verify URL', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Log in with valid student credentials', async () => {
      await loginPage.login(
        process.env.STUDENT_USERNAME!,
        process.env.PASSWORD!,
      );
      await expect(page).toHaveURL('/dashboard');
    });

    await test.step('Go to Community page', async () => {
      await communityPage.gotoCommunityPage();
      await communityPage.verifyCommunityPageIsOpened();
    });

    await test.step('Create a new thread with a specific title', async () => {
      await communityPage.clickCreateNewThreadButton();
      await communityPage.fillThreadTitle(threadTitle);
      await communityPage.clickPostThreadButton();
    });
    
    await test.step('Verify that the thread title in the list matches the entered Title exactly', async () => {
      await communityPage.verifyThreadTitleMatchesEntered(threadTitle);
    });
  });
});
