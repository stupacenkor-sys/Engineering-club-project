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
        locator: page.getByRole('link', { name: 'Dashboard', exact: true }),
        urlPattern: /\/dashboard/,
      },
      courses: {
        locator: page.getByRole('link', { name: 'Courses', exact: true }),
        urlPattern: /\/courses/,
      },
      myProgress: {
        locator: page.getByRole('link', { name: 'My Progress', exact: true }),
        urlPattern: /\/profile/,
      },
      assignments: {
        locator: page.getByRole('link', { name: 'Assignments', exact: true }),
        urlPattern: /\/assignments/,
      },
      community: {
        locator: page.getByRole('link', { name: 'Community', exact: true }),
        urlPattern: /\/community/,
      },
      aiAssistance: {
        locator: page.getByRole('link', { name: 'AI Assistant', exact: true }),
        urlPattern: /\/ai/,
      },
      skillChecks: {
        locator: page.getByRole('link', { name: 'Skill checks', exact: true }),
        urlPattern: /\/quizzes/,
      },
      resumeChecks: {
        locator: page.getByRole('link', { name: 'Resume checks', exact: true }),
        urlPattern: /\/resume/,
      },
      jobSearch: {
        locator: page.getByRole('link', { name: 'Job search', exact: true }),
        urlPattern: /\/applications/,
      },
      messages: {
        locator: page.getByRole('link', { name: 'Messages', exact: true }),
        urlPattern: /\/messages/,
      },
      calendar: {
        locator: page.getByRole('link', { name: 'Calendar', exact: true }),
        urlPattern: /\/calendar/,
      },
      mentor: {
        locator: page.getByRole('link', { name: 'Mentor dashboard', exact: true }),
        urlPattern: /\/mentor/,
      },
      admin: {
        locator: page.getByRole('link', { name: 'Admin', exact: true }),
        urlPattern: /\/admin/,
      },
      settings: {
        locator: page.getByRole('link', { name: 'Settings', exact: true }),
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
