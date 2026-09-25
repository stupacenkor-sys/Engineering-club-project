import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly resumeLearningButton: Locator;
  readonly continueLessonButton: Locator;
  readonly courseOutlineButton: Locator;
  readonly viewAllAssignmentsLink: Locator;
  readonly aiRecommendationStartRefresherButton: Locator;

  readonly welcomeMessage: Locator;
  readonly dateLabel: Locator;
  readonly currentCourseTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resumeLearningButton = page.getByRole('link', {
      name: 'Resume learning',
    });
    this.continueLessonButton = page.getByRole('link', {
      name: 'Continue lesson',
    });
    this.courseOutlineButton = page.getByRole('link', {
      name: 'Course outline',
    });
    this.viewAllAssignmentsLink = page.getByRole('link', {
      name: 'View all',
    });
    this.aiRecommendationStartRefresherButton = page.getByRole('button', {
      name: /Start refresher/,
    });

    this.welcomeMessage = page.getByRole('heading', { name: /Welcome back/ });
    this.dateLabel = page.getByText(/^Dashboard ·/i);
    this.currentCourseTitle = page
      .getByText('Current course', { exact: true })
      .locator('..')
      .locator(':scope > :last-child');
  }

  async gotoDashboard() {
    await this.page.goto('/dashboard');
  }

  async clickResumeLearning() {
    await this.resumeLearningButton.click();
  }

  async clickContinueLesson() {
    await this.continueLessonButton.click();
  }

  async clickCourseOutline() {
    await this.courseOutlineButton.click();
  }

  async clickViewAllAssignments() {
    await this.viewAllAssignmentsLink.click();
  }

  async clickAiRecommendationStartRefresher() {
    await this.aiRecommendationStartRefresherButton.click();
  }

  async getCurrentCourseTitle() {
    return (await this.currentCourseTitle.textContent())?.trim() ?? '';
  }

  async expectDashboardPageOpened() {
    await expect(this.page).toHaveURL('/dashboard');
    await expect(this.welcomeMessage).toBeVisible();
  }

  async expectLoggedInDashboardVisible() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.resumeLearningButton).toBeVisible();
  }

  async expectWelcomeMessageFor(studentName: string) {
    await expect(this.welcomeMessage).toHaveText(`Welcome back, ${studentName}`);
  }

  async expectDateDisplayed(date: string) {
    await expect(this.dateLabel).toContainText(date, {
      ignoreCase: true,
    });
  }

  async expectCurrentCoursePageOpened(courseTitle: string) {
    await expect(this.page).toHaveURL(/\/courses\//);
    await expect(
      this.page.getByRole('heading', { name: courseTitle, level: 1 }),
    ).toBeVisible();
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }
}
