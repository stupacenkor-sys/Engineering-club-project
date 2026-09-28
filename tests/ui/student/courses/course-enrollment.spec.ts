import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { CoursesPage } from '@pages/courses.page';
import { CourseDetailsPage } from '@pages/course-details.page';

test.describe('Course enrollment', () => {
  let coursesPage: CoursesPage;
  let courseDetailsPage: CourseDetailsPage;
  let enrollableCard: Locator;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    coursesPage = new CoursesPage(page);
    courseDetailsPage = new CourseDetailsPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/\/dashboard/);

    await coursesPage.open();
    enrollableCard = coursesPage.getFirstEnrollableCard();
  });

  test(
    'should display Enroll button when course is not started',
    { tag: '@C541' },
    async () => {
      await test.step('Verify Enroll button on not started course', async () => {
        await expect(
          coursesPage.getCardParts(enrollableCard).status,
        ).toHaveText('Not started');
        await expect(
          enrollableCard.getByRole('link', { name: 'Enroll' }),
        ).toBeVisible();
      });
    },
  );

  test(
    'should have enabled Enroll button when course is not started',
    { tag: '@C542' },
    async () => {
      await test.step('Verify Enroll button is enabled', async () => {
        await expect(
          enrollableCard.getByRole('link', { name: 'Enroll' }),
        ).toBeEnabled();
      });
    },
  );

  test(
    'should open course page when student clicks Enroll',
    { tag: '@C543' },
    async ({ page }) => {
      await test.step('Click Enroll', async () => {
        await coursesPage.clickEnroll(enrollableCard);
      });

      await test.step('Verify course page with start action is opened', async () => {
        await expect(page).toHaveURL(/\/courses\/[\w-]+$/);
        await expect(courseDetailsPage.courseTitle).toBeVisible();
        await expect(courseDetailsPage.startOrContinueLink).toBeVisible();
      });
    },
  );

  test(
    'should open the same course that was enrolled when Enroll is clicked',
    { tag: '@C544' },
    async () => {
      const titleLink = coursesPage.getCardParts(enrollableCard).titleLink;
      const courseTitle = await titleLink.innerText();
      const courseHref = (await titleLink.getAttribute('href'))!;

      await test.step(`Click Enroll on "${courseTitle}"`, async () => {
        await coursesPage.clickEnroll(enrollableCard);
      });

      await test.step('Verify opened course matches selected card', async () => {
        await courseDetailsPage.expectCourseOpened(
          courseHref.replace('/courses/', ''),
          courseTitle,
        );
      });
    },
  );

  test(
    'should keep enrolled course opened when page is refreshed',
    { tag: '@C545' },
    async ({ page }) => {
      let courseTitle = '';

      await test.step('Enroll in course', async () => {
        courseTitle = await coursesPage
          .getCardParts(enrollableCard)
          .titleLink.innerText();
        await coursesPage.clickEnroll(enrollableCard);
        await expect(courseDetailsPage.courseTitle).toHaveText(courseTitle);
      });

      const urlBeforeReload = page.url();

      await test.step('Refresh page', async () => {
        await courseDetailsPage.reload();
      });

      await test.step('Verify course state is kept', async () => {
        await expect(page).toHaveURL(urlBeforeReload);
        await expect(courseDetailsPage.courseTitle).toHaveText(courseTitle);
        await expect(courseDetailsPage.startOrContinueLink).toBeVisible();
      });
    },
  );
});
