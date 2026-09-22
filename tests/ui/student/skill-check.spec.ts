import { test, expect, Locator } from '@playwright/test';

const STUDENT_EMAIL = 'maria@example.com';
const STUDENT_PASSWORD = 'password123';

test.describe('Passing skill checks by student', () => {
  let emailInput: Locator;
  let passwordInput: Locator;
  let submitButton: Locator;

  test('should navigate to skill check page when clicking link', async ({
    page,
  }) => {
    await test.step('Go to login page', async () => {
      await page.goto('/login');
      await expect(page).toHaveURL(/\/login/);
    });

    await test.step('Login as student', async () => {
      emailInput = page.getByRole('textbox', { name: 'Email' });
      passwordInput = page.getByRole('textbox', { name: 'Password' });
      submitButton = page.getByRole('button', { name: 'Sign in' });

      await emailInput.fill(STUDENT_EMAIL);
      await passwordInput.fill(STUDENT_PASSWORD);
      await submitButton.click();

      await expect(page).toHaveURL(/\/dashboard/);
    });

    await test.step('Go to skill check page', async () => {
      await page.getByRole('link', { name: 'Skill Checks' }).click();
      await expect(page).toHaveURL(/\/quizzes/);
    });
  });
});
