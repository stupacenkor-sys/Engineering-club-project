import { Page, Locator, expect } from '@playwright/test';
import { areaFilters, levelFilters, AreaFilterName, LevelFilterName } from './filter-options';

type FilterValue = { locator: Locator; urlPattern: RegExp };

export class SkillCheckFilterComponent {
  readonly areaFilterContainer: Locator;
  readonly levelFilterContainer: Locator;

  readonly areaFilter: Record<AreaFilterName, FilterValue>;
  readonly levelFilter: Record<LevelFilterName, FilterValue>;

  readonly clickAreaFilter: Record<AreaFilterName, () => Promise<void>>;
  readonly clickLevelFilter: Record<LevelFilterName, () => Promise<void>>;
  readonly verifyAreaFilter: Record<AreaFilterName, () => Promise<void>>;
  readonly verifyLevelFilter: Record<LevelFilterName, () => Promise<void>>;

  constructor(page: Page) {
    this.areaFilterContainer = page.getByText('Area', { exact: true }).locator('..');
    this.levelFilterContainer = page.getByText('Level', { exact: true }).locator('..');

    this.areaFilter = {} as Record<AreaFilterName, FilterValue>;
    for (const name of Object.keys(areaFilters) as AreaFilterName[]) {
      const option = areaFilters[name];
      this.areaFilter[name] = {
        locator: this.areaFilterContainer.getByRole('link', { name: option.label }),
        urlPattern: option.urlPattern,
      };
    }

    this.levelFilter = {} as Record<LevelFilterName, FilterValue>;
    for (const name of Object.keys(levelFilters) as LevelFilterName[]) {
      const option = levelFilters[name];
      this.levelFilter[name] = {
        locator: this.levelFilterContainer.getByRole('link', { name: option.label }),
        urlPattern: option.urlPattern,
      };
    }

    this.clickAreaFilter = this.mapAreaFilters((filter) => async () => filter.locator.click());
    this.clickLevelFilter = this.mapLevelFilters((filter) => async () => filter.locator.click());
    this.verifyAreaFilter = this.mapAreaFilters((filter) => async () => expect(page).toHaveURL(filter.urlPattern));
    this.verifyLevelFilter = this.mapLevelFilters((filter) => async () => expect(page).toHaveURL(filter.urlPattern));
  }

  private mapAreaFilters<T>(
    action: (filter: FilterValue) => T,
  ): Record<AreaFilterName, T> {
    const result = {} as Record<AreaFilterName, T>;
    for (const name of Object.keys(this.areaFilter) as AreaFilterName[]) {
      result[name] = action(this.areaFilter[name]);
    }
    return result;
  }

  private mapLevelFilters<T>(
    action: (filter: FilterValue) => T,
  ): Record<LevelFilterName, T> {
    const result = {} as Record<LevelFilterName, T>;
    for (const name of Object.keys(this.levelFilter) as LevelFilterName[]) {
      result[name] = action(this.levelFilter[name]);
    }
    return result;
  }

  async verifyFilter() {
    await expect(this.areaFilterContainer).toBeVisible();
    await expect(this.levelFilterContainer).toBeVisible();
  }

  async verifyAreaFilterValues() {
    for (const filter of Object.values<FilterValue>(this.areaFilter)) {
      await expect(filter.locator).toBeVisible();
    }
  }

  async verifyLevelFilterValues() {
    for (const filter of Object.values<FilterValue>(this.levelFilter)) {
      await expect(filter.locator).toBeVisible();
    }
  }
}