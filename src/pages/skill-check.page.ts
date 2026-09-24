import { Page, Locator, expect } from '@playwright/test';

export class SkillCheckPage {
  readonly page: Page;

  readonly areaFilterContainer: Locator;
  readonly areaFilterAllLink: Locator;
  readonly areaFilterTypescriptLink: Locator;
  readonly areaFilterQALink: Locator;
  readonly areaFilterSDLCLink: Locator;
  readonly areaFilterExpirienceLink: Locator;
  readonly areaFilterCICDLink: Locator;
  readonly areaFilterDatabaseLink: Locator;
  readonly areaFilterAILink: Locator;
  readonly areaFilterGitLink: Locator;
  readonly areaFilterToolsLink: Locator;
  readonly areaFilterMobileLink: Locator;
  readonly areaFilterPerfomanceLink: Locator;

  readonly levelFilterContainer: Locator;
  readonly levelFilterAllLink: Locator;
  readonly levelFilterBasicLink: Locator;
  readonly levelFilterIntermediateLink: Locator;
  readonly levelFilterAdvancedLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.areaFilterContainer = page
      .getByText('Area', { exact: true })
      .locator('..');

    this.areaFilterAllLink = this.areaFilterContainer.getByRole('link', {
      name: 'All',
    });

    this.areaFilterTypescriptLink = this.areaFilterContainer.getByRole('link', {
      name: 'Programming · TypeScript',
    });

    this.areaFilterQALink = this.areaFilterContainer.getByRole('link', {
      name: 'QA theory',
    });

    this.areaFilterSDLCLink = this.areaFilterContainer.getByRole('link', {
      name: 'SDLC & processes',
    });

    this.areaFilterExpirienceLink = this.areaFilterContainer.getByRole('link', {
      name: 'Project experience',
    });

    this.areaFilterCICDLink = this.areaFilterContainer.getByRole('link', {
      name: 'CI/CD',
    });

    this.areaFilterDatabaseLink = this.areaFilterContainer.getByRole('link', {
      name: 'Databases',
    });

    this.areaFilterAILink = this.areaFilterContainer.getByRole('link', {
      name: 'AI',
    });

    this.areaFilterGitLink = this.areaFilterContainer.getByRole('link', {
      name: 'Git',
    });

    this.areaFilterToolsLink = this.areaFilterContainer.getByRole('link', {
      name: 'Project tools',
    });

    this.areaFilterMobileLink = this.areaFilterContainer.getByRole('link', {
      name: 'Mobile testing',
    });

    this.areaFilterPerfomanceLink = this.areaFilterContainer.getByRole('link', {
      name: 'Performance testing',
    });

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

  async verifyFilter() {
    await expect(this.areaFilterContainer).toBeVisible();
    await expect(this.levelFilterContainer).toBeVisible();
  }

  async verifyAreaFilterValues() {
    await expect(this.areaFilterAllLink).toBeVisible();
    await expect(this.areaFilterTypescriptLink).toBeVisible();
    await expect(this.areaFilterQALink).toBeVisible();
    await expect(this.areaFilterSDLCLink).toBeVisible();
    await expect(this.areaFilterExpirienceLink).toBeVisible();
    await expect(this.areaFilterCICDLink).toBeVisible();
    await expect(this.areaFilterDatabaseLink).toBeVisible();
    await expect(this.areaFilterAILink).toBeVisible();
    await expect(this.areaFilterGitLink).toBeVisible();
    await expect(this.areaFilterToolsLink).toBeVisible();
    await expect(this.areaFilterMobileLink).toBeVisible();
    await expect(this.areaFilterPerfomanceLink).toBeVisible();
  }

  async verifyLevelFilterValues() {
    await expect(this.levelFilterAllLink).toBeVisible();
    await expect(this.levelFilterBasicLink).toBeVisible();
    await expect(this.levelFilterIntermediateLink).toBeVisible();
    await expect(this.levelFilterAdvancedLink).toBeVisible();
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/quizzes/);
  }
}
