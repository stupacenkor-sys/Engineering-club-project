import { Page, Locator, expect } from '@playwright/test';

export class SkillCheckPage {
  readonly page: Page;
  readonly areaFilter: Locator;

  readonly levelFilterContainer: Locator;
  readonly levelFilterAllLink: Locator;
  readonly levelFilterBasicLink: Locator;
  readonly levelFilterIntermediateLink: Locator;
  readonly levelFilterAdvancedLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.areaFilter = page.getByText('Area', { exact: true });

    this.levelFilterContainer = page
      .getByText('Level', { exact: true })
      .locator('..');

    this.levelFilterAllLink = this.levelFilterContainer.getByRole('link', {
      name: 'All',
    });

    this.levelFilterBasicLink = this.levelFilterContainer.getByRole('link', {
      name: 'Basic',
    });

    this.levelFilterIntermediateLink = this.levelFilterContainer.getByRole(
      'link',
      {
        name: 'Intermediate',
      },
    );

    this.levelFilterAdvancedLink = this.levelFilterContainer.getByRole('link', {
      name: 'Advanced',
    });
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/quizzes/);
  }
}
