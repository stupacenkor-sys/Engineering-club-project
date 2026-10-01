import { test } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { AssignmentsPage } from '@pages/assignments.page';

const STUDENT_EMAIL = process.env.STUDENT_EMAIL!;
const STUDENT_PASSWORD = process.env.PASSWORD!;

test.describe('Assignments page', () => {
  test('C578 Default "All" filter shows all assignments', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const assignmentsPage = new AssignmentsPage(page);

    await test.step('Log in as student', async () => {
      await loginPage.goto();
      await loginPage.login(STUDENT_EMAIL, STUDENT_PASSWORD);
    });

    await test.step('Open the Assignments page', async () => {
      await assignmentsPage.goto();
      await assignmentsPage.verifySelfURL();
    });

    await test.step('Verify "All" is selected and table shows all statuses', async () => {
      await assignmentsPage.expectAllFilterSelected();
      await assignmentsPage.expectTableShowsAllStatuses();
    });
  });
});
