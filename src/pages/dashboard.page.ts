import { Page, Locator } from '@playwright/test';

export class DashBoardPage {
  readonly page: Page;

  readonly resumelearningButton: Locator;
  readonly continuelessonButton: Locator;
  readonly courseoutlineButton: Locator;
  readonly viewAllAssignmentsLink: Locator;
  readonly aiRecommendationStartRefresherButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.resumelearningButton = page.getByRole('link', { name: 'Resume learning' });
    this.continuelessonButton = page.getByRole('link', { name: 'Continue lesson' });
    this.courseoutlineButton = page.getByRole('link', { name: 'Course outline' });
    this.viewAllAssignmentsLink = page.getByRole('link', { name: 'View all assignments' });
    this.aiRecommendationStartRefresherButton = page.getByRole('button', { name: 'Start refresher →' });
   
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