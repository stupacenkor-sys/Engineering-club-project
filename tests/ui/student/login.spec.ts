import { LoginPage } from '@pages/login.page';
import { test, expect } from '@playwright/test';
import { Sidebar } from '../../../src/sidebar';

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

test('Login as two different students', async ({ page }) => {
  const loginPage = new LoginPage(page); // page object for the login page
  const sidebar = new Sidebar(page); // page object for the sidebar
  await test.step('go to Login Page', async () => {
    await loginPage.goto(); // page object for the login page
    await loginPage.verifySelfURL(); // page object for the login page
  });

  await test.step('Login as student 1', async () => {
    await loginPage.login(student1.email, student1.password); // page object for the login page
    await sidebar.verifyURL.dashboard(); // page object for the sidebar
  });

  await test.step('Logout Student 1', async () => {
    const userMenuButton = page.getByRole('button', {
      name: student1.name,
    });

    const signOutButton = page.getByRole('menuitem', {
      name: 'Sign out',
    });

    await userMenuButton.click();
    await signOutButton.click();
    await expect(page).toHaveURL(/\/login/);
  });

  await test.step('Login as Student 2', async () => {
    await loginPage.login(student2.email, student2.password); // page object for the login page
    await sidebar.verifyURL.dashboard(); // page object for the sidebar
  });
});
