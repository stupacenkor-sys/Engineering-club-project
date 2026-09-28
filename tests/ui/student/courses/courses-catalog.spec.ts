import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { CoursesPage } from '@pages/courses.page';
import { CourseDetailsPage } from '@pages/course-details.page';
import { Sidebar } from '../../../../src/sidebar';
import { studentData } from '../../../../src/test-data/users';
import {
  featuredLearningPath,
  manualTestingCourse,
} from '../../../../src/test-data/courses';

test.describe('Courses catalog', () => {
  let coursesPage: CoursesPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    coursesPage = new CoursesPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test(
    'should open courses page when student clicks Courses in sidebar',
    { tag: '@C521' },
    async ({ page }) => {
      const sidebar = new Sidebar(page);

      await test.step('Click Courses in sidebar', async () => {
        await sidebar.clickLink.courses();
      });

      await test.step('Verify courses page is opened', async () => {
        await coursesPage.expectCoursesPageOpened();
      });
    },
  );

  test(
    'should display courses page when student is logged in',
    { tag: '@C522' },
    async () => {
      await coursesPage.open();

      await test.step('Verify courses page is shown for the logged-in student', async () => {
        await coursesPage.expectCoursesPageOpened();
        await coursesPage.expectUserIsLoggedIn(studentData.fullName);
      });
    },
  );

  test(
    'should display page title and subtitle when courses page is opened',
    { tag: '@C523' },
    async () => {
      await coursesPage.open();

      await test.step('Verify title and subtitle', async () => {
        await expect(coursesPage.pageTitle).toBeVisible();
        await expect(coursesPage.pageSubtitle).toBeVisible();
      });
    },
  );

  test(
    'should show total that matches number of course cards when catalog is loaded',
    { tag: '@C524' },
    async () => {
      await coursesPage.open();
      const declaredCount = await coursesPage.getCatalogCoursesCount();

      await test.step(`Verify ${declaredCount} course cards are rendered`, async () => {
        await expect(coursesPage.courseCards).toHaveCount(declaredCount);
      });

      await test.step('Verify featured path shows the same total', async () => {
        await expect(coursesPage.featuredPath).toContainText(
          `${declaredCount} courses`,
        );
      });
    },
  );

  test(
    'should display available courses when catalog is loaded',
    { tag: '@C525' },
    async () => {
      await coursesPage.open();

      await test.step('Verify catalog is not empty', async () => {
        await expect(coursesPage.courseCards.first()).toBeVisible();
      });

      await test.step('Verify known course is present', async () => {
        await expect(
          coursesPage.getCourseCard(manualTestingCourse.title),
        ).toBeVisible();
      });
    },
  );

  test(
    'should display each course only once when catalog is loaded',
    { tag: '@C526' },
    async () => {
      await coursesPage.open();
      await expect(coursesPage.courseCards.first()).toBeVisible();

      const titles = await coursesPage.getCourseTitles();

      await test.step('Verify course titles are unique', async () => {
        const duplicates = titles.filter(
          (title, index) => titles.indexOf(title) !== index,
        );
        expect(duplicates, 'duplicated course titles').toEqual([]);
      });
    },
  );

  test(
    'should display featured learning path when catalog is loaded',
    { tag: '@C527' },
    async () => {
      await coursesPage.open();

      await test.step('Verify featured path block is visible', async () => {
        await expect(coursesPage.featuredPath).toBeVisible();
        await expect(coursesPage.viewPathLink).toBeVisible();
      });
    },
  );

  test(
    'should show correct featured learning path information when catalog is loaded',
    { tag: '@C528' },
    async () => {
      await coursesPage.open();

      await test.step('Verify title and description', async () => {
        await expect(coursesPage.featuredPathTitle).toHaveText(
          featuredLearningPath.title,
        );
        await expect(coursesPage.featuredPath).toContainText(
          featuredLearningPath.description,
        );
        await expect(coursesPage.featuredPath).toContainText(
          featuredLearningPath.mentorshipTag,
        );
      });

      await test.step('Verify path steps are listed', async () => {
        for (const step of featuredLearningPath.steps) {
          await expect(
            coursesPage.featuredPath.getByText(step, { exact: true }),
          ).toBeVisible();
        }
      });
    },
  );

  test(
    'should open learning path when View path is clicked',
    { tag: '@C529' },
    async ({ page }) => {
      await coursesPage.open();

      await test.step('Click View path', async () => {
        await coursesPage.clickViewPath();
      });

      await test.step('Verify learning path page is opened', async () => {
        await expect(page).toHaveURL(/\/path$/);
        await expect(
          page.getByRole('heading', { name: featuredLearningPath.title }),
        ).toBeVisible();
      });
    },
  );

  test(
    'should render all parts of every course card when catalog is loaded',
    { tag: '@C530' },
    async () => {
      await coursesPage.open();
      await expect(coursesPage.courseCards.first()).toBeVisible();

      const cards = await coursesPage.courseCards.all();

      for (const [index, card] of cards.entries()) {
        const title = await coursesPage
          .getCardParts(card)
          .titleLink.innerText();

        await test.step(`Verify card #${index + 1} "${title}"`, async () => {
          await coursesPage.expectCardDisplayedCorrectly(card);
        });
      }
    },
  );

  test(
    'should show correct data on course card when catalog is loaded',
    { tag: '@C531' },
    async () => {
      await coursesPage.open();
      const card = coursesPage.getCourseCard(manualTestingCourse.title);
      const parts = coursesPage.getCardParts(card);

      await test.step(`Verify "${manualTestingCourse.title}" card data`, async () => {
        await expect(parts.kicker).toHaveText(manualTestingCourse.kicker, {
          ignoreCase: true,
        });
        await expect(parts.xpEarned).toContainText(
          new RegExp(`/\\s*${manualTestingCourse.xpTotal} XP`),
        );
        await expect(parts.meta).toContainText(
          `${manualTestingCourse.workloadHours} h · Mentor: ${manualTestingCourse.mentorShortName}`,
        );
      });
    },
  );

  test(
    'should open selected course when course card title is clicked',
    { tag: '@C532' },
    async ({ page }) => {
      const courseDetailsPage = new CourseDetailsPage(page);
      await coursesPage.open();

      await test.step('Click course title', async () => {
        await coursesPage.clickCourseTitle(manualTestingCourse.title);
      });

      await test.step('Verify course page is opened', async () => {
        await courseDetailsPage.expectCourseOpened(
          manualTestingCourse.slug,
          manualTestingCourse.title,
        );
      });
    },
  );
});
