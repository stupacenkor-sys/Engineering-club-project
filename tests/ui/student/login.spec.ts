import { LoginPage } from '@pages/login.page';
import { test, expect } from '@playwright/test';
import { Sidebar } from '@pages/../sidebar';
import { JobSearchPage } from '@pages/job-search.page';

interface Credentials {
  name: string;
  email: string;
  password: string;
}

const student1: Credentials = {
  name: 'Maria Kovalenko',
  email: 'maria@example.com',
  password: 'password123',
};

const student2: Credentials = {
  name: 'Andriy Shevchuk',
  email: 'andriy@example.com',
  password: 'password123',
};

// обьеднання групи тестів в describe блок, щоб можна було запускати їх разом або окремо
test.describe.only('Job Search Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebar = new Sidebar(page);

    await test.step('go to Login Page', async () => {
      await loginPage.goto();
      await loginPage.verifySelfURL();
    });

    await test.step('Login as student 1', async () => {
      await loginPage.login(student1.email, student1.password);
      await sidebar.verifyURL.dashboard();
    });

    await test.step('Go to Job Search Page', async () => {
      await sidebar.clickLink.jobSearch();
      await sidebar.verifyURL.jobSearch();
    });
  });

  test('verify title on the page Job Search', async ({ page }) => {
    const jobSearchPage = new JobSearchPage(page);

    await test.step('verify title on the page Job Search', async () => {
      await jobSearchPage.verifyTitle();
    });
  });

  test('Check after clic update link button search buttons appear', async ({
    page,
  }) => {
    const jobSearchPage = new JobSearchPage(page);

    await test.step('should fill search box and click update link', async () => {
      await jobSearchPage.fillTextBoxRolesAndClickUpdateLinks();
    });

     await test.step('verify add role search', async () => {
      await jobSearchPage.verifyAddRoleSearch();
    });
  });
});
