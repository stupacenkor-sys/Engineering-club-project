import { Page, Locator } from '@playwright/test';

export class DashBoardPage {
  readonly page: Page;

  readonly resumelearningButton: Locator;
  readonly continuelessonButton: Locator;
  readonly courseoutlineButton: Locator;
  readonly viewAllAssignmentsLink: Locator;
  readonly aiRecommendationStartRefresherButton: Locator;

  // Dashboard page (C380–C384)
  readonly welcomeMessage: Locator;
  readonly dateLabel: Locator;
  readonly currentCourseTitle: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;

    this.resumelearningButton = page.getByRole('link', {
      name: 'Resume learning',
    });
    this.continuelessonButton = page.getByRole('link', {
      name: 'Continue lesson',
    });
    this.courseoutlineButton = page.getByRole('link', {
      name: 'Course outline',
    });
    this.viewAllAssignmentsLink = page.getByRole('link', {
      name: 'View all assignments',
    });
    this.aiRecommendationStartRefresherButton = page.getByRole('button', {
      name: 'Start refresher →',
    });

    // Dashboard page (C380–C384)
    this.welcomeMessage = page.getByRole('heading', { name: /Welcome back/ });
    this.dateLabel = page.getByText(/^Dashboard ·/i);
    this.currentCourseTitle = page
      .getByText('Current course', { exact: true })
      .locator('..')
      .locator(':scope > :last-child');
    this.userName = page.getByRole('banner').getByText('Maria Kovalenko');
  }
  async gotodashboard() {
    await this.page.goto('/dashboard');
  }

  async clickResumelearning() {
    await this.resumelearningButton.click();
  }
  async clickContinuelesson() {
    await this.continuelessonButton.click();
  }
  async clickCourseoutline() {
    await this.courseoutlineButton.click();
  }
  async clickViewAllAssignments() {
    await this.viewAllAssignmentsLink.click();
  }
  async clickAiRecommendationStartRefresher() {
    await this.aiRecommendationStartRefresherButton.click();
  }
}
