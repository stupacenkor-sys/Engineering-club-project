import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashBoardPage } from '@pages/dashboard.page';

test.describe('Dashboard page', () => {
  let dashboardPage: DashBoardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboardPage = new DashBoardPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL('/dashboard');
  });

  test(
    'should open dashboard page when student logs in',
    { tag: '@C380' },
    async ({ page }) => {
      await test.step('Verify dashboard page is opened', async () => {
        await expect(page).toHaveURL('/dashboard');
        await expect(dashboardPage.welcomeMessage).toBeVisible();
      });
    },
  );

  test(
    'should display dashboard when user is logged in',
    { tag: '@C381' },
    async () => {
      await test.step('Verify logged-in user data is displayed', async () => {
        await expect(dashboardPage.userName).toBeVisible();
        await expect(dashboardPage.resumelearningButton).toBeVisible();
      });
    },
  );

  test(
    'should display user name when student opens dashboard',
    { tag: '@C382' },
    async () => {
      await test.step('Verify user name in welcome message', async () => {
        await expect(dashboardPage.welcomeMessage).toHaveText(
          `Welcome back, ${process.env.STUDENT_NAME}`,
        );
      });
    },
  );

  test(
    'should display current date when dashboard is opened',
    { tag: '@C383' },
    async () => {
      // формат на сайте: "Tue, Sep 22"
      const today = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      await test.step('Verify current date is displayed', async () => {
        await expect(dashboardPage.dateLabel).toContainText(today, {
          ignoreCase: true,
        });
      });
    },
  );

  test(
    'should open current course when Resume learning is clicked',
    { tag: '@C384' },
    async ({ page }) => {
      let courseTitle = '';

      await test.step('Remember current course title', async () => {
        courseTitle =
          (await dashboardPage.currentCourseTitle.textContent())?.trim() ?? '';
      });

      await test.step('Click Resume learning', async () => {
        await dashboardPage.clickResumelearning();
      });

      await test.step('Verify current course page is opened', async () => {
        await expect(page).toHaveURL(/\/courses\//);
        await expect(
          page.getByRole('heading', { name: courseTitle, level: 1 }),
        ).toBeVisible();
      });
    },
  );
});
