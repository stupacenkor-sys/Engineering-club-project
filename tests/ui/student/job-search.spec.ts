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
  const loginPage = new LoginPage(page);
  const sidebar = new Sidebar(page);

  await test.step('go to Login Page', async () => {
    await loginPage.goto();
    await loginPage.verifySelfURL();
  });

  await test.step('Login as student', async () => {
    await loginPage.login(student1.email, student1.password);
    await sidebar.verifyURL.dashboard();
  });
});
