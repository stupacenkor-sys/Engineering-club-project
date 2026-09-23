import { test, expect } from '@playwright/test';
import { CommunityPage } from '@pages/community.page';
import { LoginPage } from '@pages/login.page'
test.describe('Community page', () => {
    const threadTitle = 'Test Thread Title';
    const threadTag = 'Test Tag';
  test('The thread title in the list matches the entered Title exactly', async ({ page }) => {

  const communityPage = new CommunityPage(page);
  const loginPage = new LoginPage(page);
      await test.step('Open login page', async () => {
      await loginPage.goto();
      });

      await test.step('Log in with valid student credentials', async () => {
      await loginPage.login(process.env.STUDENT_USERNAME!, process.env.PASSWORD!);
      await expect(page).toHaveURL('/dashboard');
      });
      await test.step('Go to Community page', async () => {
      await communityPage.gotocommunitypage();
      });
      await test.step('Create a new thread with a specific title', async () => {

        await communityPage.createNewThread(threadTitle, threadTag);
        
  });
  await test.step('Verify that the thread title in the list matches the entered Title exactly', async () => {
     const threadTitleInList = await page.getByRole('heading', { name: threadTitle }).textContent();
     expect(threadTitleInList).toBe(threadTitle);
  });
  });
});