import { test, expect, Locator } from '@playwright/test';

const STUDENT_EMAIL = 'maria@example.com';
const STUDENT_PASSWORD = 'password123';

test.describe('Passing skill checks by student', () => {
  let emailInput: Locator;
  let passwordInput: Locator;
  let submitButton: Locator;

  let areaFilter: Locator;
  let levelFilter: Locator;

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

  test('should check the filter when redirected to skill check page', async ({
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

    await test.step('Verify filter is on the page', async () => {
      areaFilter = page.getByText('Area', { exact: true });
      levelFilter = page.getByText('Level', { exact: true });
      const filterContainer = page
        .locator('div.blueprint')
        .filter({ has: areaFilter })
        .filter({ has: levelFilter });

      await expect(areaFilter).toBeVisible();
      await expect(levelFilter).toBeVisible();
      await expect(filterContainer).toBeVisible();
    });
  });
});
