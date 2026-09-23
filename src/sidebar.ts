import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
  readonly page: Page;

  readonly dashboardLink: Locator;
  readonly coursesLink: Locator;
  readonly myProgressLink: Locator;
  readonly assignmentsLink: Locator;
  readonly communityLink: Locator;
  readonly aiAssistanceLink: Locator;
  readonly skillChecksLink: Locator;
  readonly resumeChecksLink: Locator;
  readonly jobSearchLink: Locator;
  readonly messagesLink: Locator;
  readonly calendarLink: Locator;
  readonly mentorLink: Locator;
  readonly adminLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.coursesLink = page.getByRole('link', { name: 'Courses' });
    this.myProgressLink = page.getByRole('link', { name: 'My Progress' });
    this.assignmentsLink = page.getByRole('link', { name: 'Assignments' });
    this.communityLink = page.getByRole('link', { name: 'Community' });
    this.aiAssistanceLink = page.getByRole('link', { name: 'AI Assistant' });
    this.skillChecksLink = page.getByRole('link', { name: 'Skill checks' });
    this.resumeChecksLink = page.getByRole('link', { name: 'Resume checks' });
    this.jobSearchLink = page.getByRole('link', { name: 'Job search' });
    this.messagesLink = page.getByRole('link', { name: 'Messages' });
    this.calendarLink = page.getByRole('link', { name: 'Calendar' });
    this.mentorLink = page.getByRole('link', { name: 'Mentor dashboard' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.settingsLink = page.getByRole('link', { name: 'Settings' });
  }

  async clickDashboardLink() {
    await this.dashboardLink.click();
  }

  async verifyDashboardURL() {
    await expect(this.page).toHaveURL(/\/dashboard/);
  }

  async clickCoursesLink() {
    await this.coursesLink.click();
  }

  async verifyCoursesURL() {
    await expect(this.page).toHaveURL(/\/courses/);
  }

  async clickMyProgressLink() {
    await this.myProgressLink.click();
  }

  async verifyMyProgressURL() {
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async clickAssignmentsLink() {
    await this.assignmentsLink.click();
  }

  async verifyAssignmentsURL() {
    await expect(this.page).toHaveURL(/\/assignments/);
  }

  async clickCommunityLink() {
    await this.communityLink.click();
  }

  async verifyCommunityURL() {
    await expect(this.page).toHaveURL(/\/community/);
  }

  async clickAiAssistanceLink() {
    await this.aiAssistanceLink.click();
  }

  async verifyAiAssistanceURL() {
    await expect(this.page).toHaveURL(/\/ai/);
  }

  async clickSkillChecksLink() {
    await this.skillChecksLink.click();
  }

  async verifySkillChecksURL() {
    await expect(this.page).toHaveURL(/\/quizzes/);
  }

  async clickResumeChecksLink() {
    await this.resumeChecksLink.click();
  }

  async verifyResumeChecksURL() {
    await expect(this.page).toHaveURL(/\/resume/);
  }

  async clickJobSearchLink() {
    await this.jobSearchLink.click();
  }

  async verifyJobSearchURL() {
    await expect(this.page).toHaveURL(/\/applications/);
  }

  async clickMessagesLink() {
    await this.messagesLink.click();
  }

  async verifyMessagesURL() {
    await expect(this.page).toHaveURL(/\/messages/);
  }

  async clickCalendarLink() {
    await this.calendarLink.click();
  }

  async verifyCalendarURL() {
    await expect(this.page).toHaveURL(/\/calendar/);
  }

  async clickMentorLink() {
    await this.mentorLink.click();
  }

  async verifyMentorURL() {
    await expect(this.page).toHaveURL(/\/mentor/);
  }

  async clickAdminLink() {
    await this.adminLink.click();
  }

  async verifyAdminURL() {
    await expect(this.page).toHaveURL(/\/admin/);
  }

  async clickSettingsLink() {
    await this.settingsLink.click();
  }

  async verifySettingsURL() {
    await expect(this.page).toHaveURL(/\/settings/);
  }
}
