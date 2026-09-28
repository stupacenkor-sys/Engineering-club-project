import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { CoursesPage } from '@pages/courses.page';
import { CourseDetailsPage } from '@pages/course-details.page';
import { manualTestingCourse } from '../../../../src/test-data/courses';

const course = manualTestingCourse;

test.describe('Course details', () => {
  let courseDetailsPage: CourseDetailsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    courseDetailsPage = new CourseDetailsPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STUDENT_EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test(
    'should open course page when student selects course in catalog',
    { tag: '@C533' },
    async ({ page }) => {
      const coursesPage = new CoursesPage(page);

      await test.step('Select course in catalog', async () => {
        await coursesPage.open();
        await coursesPage.clickCourseTitle(course.title);
      });

      await test.step('Verify course page is opened', async () => {
        await expect(page).toHaveURL(new RegExp(`/courses/${course.slug}$`));
        await expect(courseDetailsPage.courseTitle).toBeVisible();
        await expect(courseDetailsPage.backToCoursesLink).toBeVisible();
      });
    },
  );

  test(
    'should display selected course title when course page is opened',
    { tag: '@C534' },
    async () => {
      await courseDetailsPage.open(course.slug);

      await test.step('Verify course title', async () => {
        await expect(courseDetailsPage.courseTitle).toHaveText(course.title);
      });
    },
  );

  test(
    'should display same description as in catalog when course page is opened',
    { tag: '@C535' },
    async ({ page }) => {
      const coursesPage = new CoursesPage(page);
      let catalogDescription = '';

      await test.step('Remember description from catalog card', async () => {
        await coursesPage.open();
        const card = coursesPage.getCourseCard(course.title);
        catalogDescription = await coursesPage
          .getCardParts(card)
          .description.innerText();
      });

      await test.step('Verify description on course page', async () => {
        await coursesPage.clickCourseTitle(course.title);
        await expect(courseDetailsPage.courseDescription).toHaveText(
          catalogDescription,
        );
      });
    },
  );

  test(
    'should display total XP when course page is opened',
    { tag: '@C536' },
    async () => {
      await courseDetailsPage.open(course.slug);

      await test.step('Verify total XP', async () => {
        await expect(courseDetailsPage.getStatValue('Total')).toHaveText(
          `${course.xpTotal} XP`,
        );
      });
    },
  );

  test(
    'should display course workload when course page is opened',
    { tag: '@C537' },
    async () => {
      await courseDetailsPage.open(course.slug);

      await test.step('Verify workload', async () => {
        await expect(courseDetailsPage.getStatValue('Workload')).toHaveText(
          `${course.workloadHours} h`,
        );
      });
    },
  );

  test(
    'should display number of lessons matching curriculum when course page is opened',
    { tag: '@C538' },
    async () => {
      await courseDetailsPage.open(course.slug);
      await expect(courseDetailsPage.courseTitle).toBeVisible();

      const lessonsStat = await courseDetailsPage.getStatNumber('Lessons');

      await test.step('Verify lessons stat matches header', async () => {
        expect(await courseDetailsPage.getLessonsCountFromKicker()).toBe(
          lessonsStat,
        );
      });

      await test.step('Verify lessons stat matches curriculum', async () => {
        await expect(courseDetailsPage.lessonCheckboxes).toHaveCount(
          lessonsStat,
        );
      });
    },
  );

  test(
    'should display number of gates matching gates list when course page is opened',
    { tag: '@C539' },
    async () => {
      await courseDetailsPage.open(course.slug);
      await expect(courseDetailsPage.courseTitle).toBeVisible();

      const gatesStat = await courseDetailsPage.getStatNumber('Gates');

      await test.step('Verify gates section heading', async () => {
        await expect(courseDetailsPage.gatesHeading).toHaveText(
          `Gates · ${gatesStat}`,
        );
      });

      await test.step('Verify gate cards count', async () => {
        await expect(courseDetailsPage.gateCards).toHaveCount(gatesStat);
      });
    },
  );

  test(
    'should display course mentor when course page is opened',
    { tag: '@C540' },
    async () => {
      await courseDetailsPage.open(course.slug);

      await test.step('Verify mentor name', async () => {
        await expect(courseDetailsPage.mentor).toHaveText(
          `Mentor: ${course.mentorFullName}`,
        );
      });
    },
  );
});
