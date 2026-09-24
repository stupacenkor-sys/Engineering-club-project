import { test } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';

test.describe('Dashboard page', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_USERNAME!, process.env.PASSWORD!);
  });

  test('should open dashboard page when student logs in', async () => {
    await test.step('Verify dashboard page is opened', async () => {
      await dashboardPage.expectDashboardPageOpened();
    });
  });

  test('should display dashboard when user is logged in', async () => {
    await test.step('Verify logged-in dashboard data is displayed', async () => {
      await dashboardPage.expectLoggedInDashboardVisible();
    });
  });

  test('should display user name when student opens dashboard', async () => {
    await test.step('Verify user name in welcome message', async () => {
      await dashboardPage.expectWelcomeMessageFor(process.env.STUDENT_NAME!);
    });
  });

  test('should display current date when dashboard is opened', async () => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    await test.step('Verify current date is displayed', async () => {
      await dashboardPage.expectDateDisplayed(today);
    });
  });

  test(
    'should open current course when Resume learning is clicked',
    async () => {
      let courseTitle = '';

      await test.step('Remember current course title', async () => {
        courseTitle = await dashboardPage.getCurrentCourseTitle();
      });

      await test.step('Click Resume learning', async () => {
        await dashboardPage.clickResumeLearning();
      });

      await test.step('Verify current course page is opened', async () => {
        await dashboardPage.expectCurrentCoursePageOpened(courseTitle);
      });
    },
  );
});
