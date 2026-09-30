import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { CoursesPage } from '@pages/courses.page';
import { CourseDetailsPage } from '@pages/course-details.page';

test.describe('Course enrollment', () => {
  let coursesPage: CoursesPage;
  let courseDetailsPage: CourseDetailsPage;
  let enrollableCard: Locator;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    coursesPage = new CoursesPage(page);
    courseDetailsPage = new CourseDetailsPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_EMAIL!, process.env.PASSWORD!);
    await dashboardPage.verifySelfURL();

    await coursesPage.gotoCourses();
    enrollableCard = coursesPage.getFirstEnrollableCard();
  });

  test('should display Enroll button when course is not started', async () => {
    await test.step('Verify Enroll button on not started course', async () => {
      await expect(
        coursesPage.getCardParts(enrollableCard).status,
      ).toHaveText('Not started');
      await expect(
        enrollableCard.getByRole('link', { name: 'Enroll' }),
      ).toBeVisible();
    });
  });

  test(
    'should have enabled Enroll button when course is not started',
    async () => {
      await test.step('Verify Enroll button is enabled', async () => {
        await expect(
          enrollableCard.getByRole('link', { name: 'Enroll' }),
        ).toBeEnabled();
      });
    },
  );

  test('should open course page when student clicks Enroll', async () => {
    await test.step('Click Enroll', async () => {
      await coursesPage.clickEnroll(enrollableCard);
    });

    await test.step('Verify course page with Enroll button is opened', async () => {
      await courseDetailsPage.verifySelfURL();
      await expect(courseDetailsPage.courseTitle).toBeVisible();
      await expect(courseDetailsPage.enrollButton).toBeVisible();
    });
  });

  test(
    'should open the same course that was enrolled when Enroll is clicked',
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
    'should keep course page opened when page is refreshed after Enroll click',
    async () => {
      const titleLink = coursesPage.getCardParts(enrollableCard).titleLink;
      const courseTitle = await titleLink.innerText();
      const courseSlug = (await titleLink.getAttribute('href'))!.replace(
        '/courses/',
        '',
      );

      await test.step('Click Enroll on course card', async () => {
        await coursesPage.clickEnroll(enrollableCard);
        await expect(courseDetailsPage.courseTitle).toHaveText(courseTitle);
      });

      await test.step('Refresh page', async () => {
        await courseDetailsPage.reloadPage();
      });

      await test.step('Verify course state is kept', async () => {
        await courseDetailsPage.expectCourseOpened(courseSlug, courseTitle);
        await expect(courseDetailsPage.enrollButton).toBeVisible();
      });
    },
  );
});
