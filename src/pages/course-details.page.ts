import { Page, Locator, expect } from '@playwright/test';

type CourseStat = 'Total' | 'Workload' | 'Lessons' | 'Gates';

export class CourseDetailsPage {
  readonly page: Page;
  private readonly main: Locator;

  readonly backToCoursesLink: Locator;
  readonly courseKicker: Locator;
  readonly courseTitle: Locator;
  readonly courseDescription: Locator;
  readonly contentLanguageNote: Locator;
  readonly mentor: Locator;
  readonly startOrContinueLink: Locator;

  readonly gatesHeading: Locator;
  readonly gateCards: Locator;
  readonly lessonCheckboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.getByRole('main');

    this.backToCoursesLink = this.main.getByRole('link', {
      name: 'Back to courses',
    });
    this.courseKicker = this.main.locator('.card-kicker').first();
    this.courseTitle = this.main.getByRole('heading', { level: 1 });
    this.courseDescription = this.courseTitle
      .locator('..')
      .locator(':scope > p');
    this.contentLanguageNote = page.getByTestId('content-language-note');
    this.mentor = this.main.getByText(/^Mentor: /);
    this.startOrContinueLink = this.main.getByRole('link', {
      name: /^(Start|Continue) · Module \d+$/,
    });

    this.gatesHeading = this.main.getByRole('heading', {
      name: /^Gates · \d+$/,
    });
    this.gateCards = this.gatesHeading.locator('..').locator('.card');
    this.lessonCheckboxes = this.main.getByRole('checkbox', {
      name: /^Mark ".+" as completed$/,
    });
  }

  async open(slug: string) {
    await this.page.goto(`/courses/${slug}`);
  }

  getStatValue(label: CourseStat) {
    return this.main
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

  async reload() {
    await this.page.reload();
  }

  async expectCourseOpened(slug: string, title: string) {
    await expect(this.page).toHaveURL(new RegExp(`/courses/${slug}(#.*)?$`));
    await expect(this.courseTitle).toHaveText(title);
  }
}
