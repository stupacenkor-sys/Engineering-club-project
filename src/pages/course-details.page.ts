import { Page, Locator, expect } from '@playwright/test';

type CourseStat = 'Total' | 'Workload' | 'Lessons' | 'Gates';

export class CourseDetailsPage {
  readonly page: Page;
  private readonly mainContent: Locator;

  readonly backToCoursesLink: Locator;
  readonly courseTitle: Locator;
  readonly courseKicker: Locator;
  readonly courseDescription: Locator;
  readonly contentLanguageNote: Locator;
  readonly mentorLabel: Locator;
  readonly enrollButton: Locator;

  readonly gatesHeading: Locator;
  readonly gateCards: Locator;
  readonly lessonCheckboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.getByRole('main');

    this.backToCoursesLink = this.mainContent.getByRole('link', {
      name: 'Back to courses',
    });
    this.courseTitle = this.mainContent.getByRole('heading', { level: 1 });
    this.courseKicker = this.courseTitle.locator('..').locator('.card-kicker');
    this.courseDescription = this.courseTitle
      .locator('..')
      .locator(':scope > p');
    this.contentLanguageNote = page.getByTestId('content-language-note');
    this.mentorLabel = this.mainContent.getByText(/^Mentor: /);
    this.enrollButton = this.mainContent.getByRole('button', {
      name: 'Enroll',
    });

    this.gatesHeading = this.mainContent.getByRole('heading', {
      name: /^Gates · \d+$/,
    });
    this.gateCards = this.gatesHeading.locator('..').locator('.card');
    this.lessonCheckboxes = this.mainContent.getByRole('checkbox', {
      name: /^Mark ".+" as completed$/,
    });
  }

  async gotoCourse(slug: string) {
    await this.page.goto(`/courses/${slug}`);
  }

  getStatValue(label: CourseStat) {
    return this.mainContent
      .getByText(label, { exact: true })
      .locator('..')
      .locator(':scope > :first-child');
  }

  async getStatNumber(label: CourseStat) {
    const text = await this.getStatValue(label).innerText();
    return Number(text.replace(/[^\d]/g, ''));
  }

  async getLessonsCountFromKicker() {
    const text = await this.courseKicker.innerText();
    return Number(text.match(/(\d+) lessons/i)![1]);
  }

  async getCourseTitle() {
    return (await this.courseTitle.innerText()).trim();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async expectCourseOpened(slug: string, title: string) {
    await expect(this.page).toHaveURL(new RegExp(`/courses/${slug}(#.*)?$`));
    await expect(this.courseTitle).toHaveText(title);
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/courses\/[\w-]+$/);
  }
}
