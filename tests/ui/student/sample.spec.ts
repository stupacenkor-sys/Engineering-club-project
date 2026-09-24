// import { test, expect, Locator } from '@playwright/test';

// const STUDENT_EMAIL = 'maria@example.com';
// const STUDENT_PASSWORD = 'password123';

// test.describe.only('Public pages for student', () => {
//   test('Student has access to applications and path', async ({ page }) => {
  
// let emailfield: Locator;
// let passwordfield: Locator;
// let submitbutton: Locator;

// await test.step('open login page', async () => {
//     await page.goto('/login');
//     await expect(page).toHaveURL(/\/login/);
// })
// await test.step('Login as student', async () => {
//     emailfield = page.getByRole('textbox', { name: 'Email' });
//     passwordfield = page.getByRole('textbox', { name: 'Password' });
//     submitbutton = page.getByRole('button', { name: 'Sign in' });

//     await emailfield.fill(STUDENT_EMAIL);
//     await passwordfield.fill(STUDENT_PASSWORD);
//     await submitbutton.click();

// })
    
//     // await page.goto('/applications');
//     // await expect(page).toHaveURL(/\/applications/);

//     // await page.goto('/path');
//     // await expect(page).toHaveURL(/\/path/);
//   });
// });


// import { test, expect, Locator } from '@playwright/test';

// const STUDENT_EMAIL = 'andriy@example.com';
// const STUDENT_PASSWORD = 'password123';

// test.describe.only('Public pages for student', () => {
//   test('Student has access to applications and path', async ({ page }) => {
  
// let emailfield: Locator;
// let passwordfield: Locator;
// let submitbutton: Locator;

// await test.step('open login page', async () => {
//     await page.goto('/login');
//     await expect(page).toHaveURL(/\/login/);
// })
// await test.step('Login as student', async () => {
//     emailfield = page.getByRole('textbox', { name: 'Email' });
//     passwordfield = page.getByRole('textbox', { name: 'Password' });
//     submitbutton = page.getByRole('button', { name: 'Sign in' });

//     await emailfield.fill(STUDENT_EMAIL);
//     await passwordfield.fill(STUDENT_PASSWORD);
//     await submitbutton.click();

// })
    
   
//   });
// });

// import { test, expect } from '@playwright/test';

// const STUDENT_EMAIL = 'maria@example.com';
// const STUDENT_PASSWORD = 'password123';

// const STUDENT2_EMAIL = 'andriy@example.com';
// const STUDENT2_PASSWORD = 'password123';

// test.only('Login as two different students', async ({ page }) => {

//   await test.step('Login as Student 1', async () => {
//     await page.goto('/login');

//     const emailField = page.getByRole('textbox', { name: 'Email' });
//     const passwordField = page.getByRole('textbox', { name: 'Password' });
//     const submitButton = page.getByRole('button', { name: 'Sign in' });

//     await emailField.fill(STUDENT_EMAIL);
//     await passwordField.fill(STUDENT_PASSWORD);
//     await submitButton.click();

//     // Проверяем, что Student 1 вошёл
//     await expect(page).toHaveURL(/dashboard/);
//   });


//   await test.step('Logout Student 1', async () => {

//     // Открываем меню пользователя
//     await page.getByRole('button', { name: 'Maria Kovalenko' }).click();

//     // Нажимаем Sign out
//     await page.getByRole('menuitem', { name: 'Sign out' }).click();

//     // Проверяем, что пользователь вышел
//     await expect(page).toHaveURL(/login/);
//   });


//   await test.step('Login as Student 2', async () => {

//     const emailField = page.getByRole('textbox', { name: 'Email' });
//     const passwordField = page.getByRole('textbox', { name: 'Password' });
//     const submitButton = page.getByRole('button', { name: 'Sign in' });

//     await emailField.fill(STUDENT2_EMAIL);
//     await passwordField.fill(STUDENT2_PASSWORD);
//     await submitButton.click();

//     // Проверяем, что Student 2 вошёл
//     await expect(page).toHaveURL(/dashboard/);
//   });

// });

import { test, expect } from '@playwright/test';

// =========================
// Test data
// =========================

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
  name: 'Andriy Bobrovskiy',
  email: 'andriy@example.com',
  password: 'password123',
};

// =========================
// Test
// =========================

test('Login as two different students', async ({ page }) => {

  // =========================
  // Login Student 1
  // =========================

  await test.step('Login as Student 1', async () => {

    await page.goto('/login');

    const emailField = page.getByRole('textbox', {
      name: 'Email'
    });

    const passwordField = page.getByRole('textbox', {
      name: 'Password'
    });

    const submitButton = page.getByRole('button', {
      name: 'Sign in'
    });

    await emailField.fill(student1.email);
    await passwordField.fill(student1.password);
    await submitButton.click();
await expect(page).toHaveURL(/\/dashboard/);
  });


  // =========================
  // Logout Student 1
  // =========================

  await test.step('Logout Student 1', async () => {

    const userMenuButton = page.getByRole('button', {
      name: student1.name
    });

    const signOutButton = page.getByRole('menuitem', {
      name: 'Sign out'
    });

    await userMenuButton.click();

    await signOutButton.click();

    await expect(page).toHaveURL(/\/login/);
  });


  // =========================
  // Login Student 2
  // =========================

  await test.step('Login as Student 2', async () => {

    const emailField = page.getByRole('textbox', {
      name: 'Email'
    });

    const passwordField = page.getByRole('textbox', {
      name: 'Password'
    });

    const submitButton = page.getByRole('button', {
      name: 'Sign in'
    });

    await emailField.fill(student2.email);

    await passwordField.fill(student2.password);

    await submitButton.click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

});