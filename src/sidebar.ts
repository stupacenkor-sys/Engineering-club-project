import { Page, Locator, expect } from '@playwright/test';

type SidebarLinkNames =
  | 'dashboard'
  | 'courses'
  | 'myProgress'
  | 'assignments'
  | 'community'
  | 'aiAssistance'
  | 'skillChecks'
  | 'resumeChecks'
  | 'jobSearch'
  | 'messages'
  | 'calendar'
  | 'mentor'
  | 'admin'
  | 'settings';

export class Sidebar {
  readonly page: Page;
  readonly links: Record<
    SidebarLinkNames,
    { locator: Locator; urlPattern: RegExp }
  >;

  constructor(page: Page) {
    this.page = page;
    this.links = {
      dashboard: {
        locator: page.getByRole('link', { name: 'Dashboard' }),
        urlPattern: /\/dashboard/,
      },
      courses: {
        locator: page.getByRole('link', { name: 'Courses' }),
        urlPattern: /\/courses/,
      },
      myProgress: {
        locator: page.getByRole('link', { name: 'My Progress' }),
        urlPattern: /\/profile/,
      },
      assignments: {
        locator: page.getByRole('link', { name: 'Assignments' }),
        urlPattern: /\/assignments/,
      },
      community: {
        locator: page.getByRole('link', { name: 'Community' }),
        urlPattern: /\/community/,
      },
      aiAssistance: {
        locator: page.getByRole('link', { name: 'AI Assistant' }),
        urlPattern: /\/ai/,
      },
      skillChecks: {
        locator: page.getByRole('link', { name: 'Skill checks' }),
        urlPattern: /\/quizzes/,
      },
      resumeChecks: {
        locator: page.getByRole('link', { name: 'Resume checks' }),
        urlPattern: /\/resume/,
      },
      jobSearch: {
        locator: page.getByRole('link', { name: 'Job search' }),
        urlPattern: /\/applications/,
      },
      messages: {
        locator: page.getByRole('link', { name: 'Messages' }),
        urlPattern: /\/messages/,
      },
      calendar: {
        locator: page.getByRole('link', { name: 'Calendar' }),
        urlPattern: /\/calendar/,
      },
      mentor: {
        locator: page.getByRole('link', { name: 'Mentor dashboard' }),
        urlPattern: /\/mentor/,
      },
      admin: {
        locator: page.getByRole('link', { name: 'Admin' }),
        urlPattern: /\/admin/,
      },
      settings: {
        locator: page.getByRole('link', { name: 'Settings' }),
        urlPattern: /\/settings/,
      },
    };
  }

  async clickLink(name: keyof typeof this.links) {
    await this.links[name].locator.click();
  }

  async verifyURL(name: keyof typeof this.links) {
    await expect(this.page).toHaveURL(this.links[name].urlPattern);
  }
}
