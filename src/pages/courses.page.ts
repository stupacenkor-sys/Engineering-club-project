import { Page, Locator, expect } from '@playwright/test';

export class CoursesPage {
  readonly page: Page;

  readonly catalogCounter: Locator;
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;
  readonly courseCards: Locator;

  readonly featuredPath: Locator;
  readonly featuredPathTitle: Locator;
  readonly viewPathLink: Locator;

  constructor(page: Page) {
    this.page = page;
    const main = page.getByRole('main');

    this.catalogCounter = main.getByRole('heading', {
      name: /^Catalog · \d+ courses$/,
    });
    this.pageTitle = main.getByRole('heading', { name: 'Courses', level: 2 });
    this.pageSubtitle = main.getByText(
      'Structured tracks from manual testing to AI-assisted automation.',
    );
    this.courseCards = main
      .locator('.card')
      .filter({ has: page.locator('.card-title a') });

    this.featuredPath = main
      .locator('.card')
      .filter({ hasText: 'Featured learning path' });
    this.featuredPathTitle = this.featuredPath.locator('.card-title');
    this.viewPathLink = this.featuredPath.getByRole('link', {
      name: 'View path',
    });
  }

  async gotoCourses() {
    await this.page.goto('/courses');
  }

  getCourseCard(courseTitle: string) {
    return this.courseCards.filter({
      has: this.page.getByRole('link', { name: courseTitle, exact: true }),
    });
  }

  getFirstEnrollableCard() {
    return this.courseCards
      .filter({ has: this.page.getByRole('link', { name: 'Enroll' }) })
      .first();
  }

  getCardParts(card: Locator) {
    return {
      kicker: card.locator('.card-kicker'),
      status: card.locator('.tag'),
      titleLink: card.locator('.card-title').getByRole('link'),
      description: card.locator('.card-body'),
      xpEarned: card.getByText('XP earned').locator('..'),
      progressBar: card.getByRole('progressbar'),
      meta: card.locator('.card-meta'),
      actionLink: card.getByRole('link', {
        name: /^(Enroll|Review materials|Continue · Module \d+)$/,
      }),
    };
  }

  async getCatalogCoursesCount() {
    const text = await this.catalogCounter.innerText();
    return Number(text.match(/\d+/)![0]);
  }

  async getCourseTitles() {
    return this.courseCards.locator('.card-title a').allInnerTexts();
  }

  async clickCourseTitle(courseTitle: string) {
    await this.getCardParts(this.getCourseCard(courseTitle)).titleLink.click();
  }

  async clickEnroll(card: Locator) {
    await card.getByRole('link', { name: 'Enroll' }).click();
  }

  async clickViewPath() {
    await this.viewPathLink.click();
  }

  async expectCoursesPageOpened() {
    await expect(this.page).toHaveURL(/\/courses$/);
    await expect(this.pageTitle).toBeVisible();
  }

  async expectUserIsLoggedIn(fullName: string) {
    await expect(
      this.page.getByRole('banner').getByRole('button', { name: fullName }),
    ).toBeVisible();
  }

  async expectCardDisplayedCorrectly(card: Locator) {
    const parts = this.getCardParts(card);

    await expect(parts.kicker).toHaveText(/^.+ · \d+ modules$/i);
    await expect(parts.status).toHaveText(
      /^(Completed|In progress|Not started|New)/,
    );
    await expect(parts.titleLink).not.toBeEmpty();
    await expect(parts.description).toBeAttached();
    await expect(parts.xpEarned).toContainText(/\d+\s*\/\s*[\d,]+ XP/);
    await expect(parts.progressBar).toBeAttached();
    await expect(parts.meta).toHaveText(/\d+ h · Mentor: .+ · \d+ enrolled/);
    await expect(parts.actionLink).toBeVisible();
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/courses$/);
  }
}
