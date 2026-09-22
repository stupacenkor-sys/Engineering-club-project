import { Page, Locator } from '@playwright/test';

export class DashBoardPage {
  readonly page: Page;
  readonly switchToEnglishlanguageButton: Locator;
  readonly switchToUkrainianlanguageButton: Locator;
  readonly resumelearningButton: Locator;
  readonly continuelessonButton: Locator;
  readonly courseoutlineButton: Locator;
  readonly viewAllAssignmentsLink: Locator;
  readonly aiRecommendationStartRefresherButton: Locator;
  readonly globalSearchInput: Locator;
  readonly notificationsButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.switchToEnglishlanguageButton = page.getByRole('button', { name: 'EN', description: 'English' });
    this.switchToUkrainianlanguageButton = page.getByRole('button', { name: 'УК' });
    this.resumelearningButton = page.getByRole('link', { name: 'Resume learning' });
    this.continuelessonButton = page.getByRole('link', { name: 'Continue lesson' });
    this.courseoutlineButton = page.getByRole('link', { name: 'Course outline' });
    this.viewAllAssignmentsLink = page.getByRole('link', { name: 'View all assignments' });
    this.aiRecommendationStartRefresherButton = page.getByRole('button', { name: 'Start refresher →' });
    this.globalSearchInput = page.getByText('Search courses, lessons, docs…⌘K');
    this.notificationsButton = page.getByRole('button', { name: 'Notifications, none unread' })
}
async gotodashboard() {
    await this.page.goto('/dashboard');
  }
async switchToEnglishlanguage() {
    await this.switchToEnglishlanguageButton.click();
  }
async switchToUkrainianlanguage() {
    await this.switchToUkrainianlanguageButton.click();
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
  async clicknotificationsButton() {
    await this.notificationsButton.click();
  }
}