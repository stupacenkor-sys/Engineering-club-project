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

type SidebarLinkValue = { locator: Locator; urlPattern: RegExp };

export class Sidebar {
  readonly page: Page;

  readonly links: Record<SidebarLinkNames, SidebarLinkValue>;
  readonly clickLink: Record<SidebarLinkNames, () => Promise<void>>;
  readonly verifyURL: Record<SidebarLinkNames, () => Promise<void>>;

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

    this.clickLink = this.mapLinks((link) => async () => link.locator.click());
    this.verifyURL = this.mapLinks((link) => async () => expect(this.page).toHaveURL(link.urlPattern));
  }

  /**
   * Maps the links to their respective actions
   * @param action - The action to perform on each link like locator.click()
   * @returns A record mapping each link name to its corresponding action
   */
  private mapLinks<T>(action: (value: SidebarLinkValue) => T): Record<SidebarLinkNames, T> {
    const result = {} as Record<SidebarLinkNames, T>;
    const linkNames = Object.keys(this.links) as SidebarLinkNames[];
    for (const name of linkNames) {
      result[name] = action(this.links[name]);
    }
    return result;
  }
}
