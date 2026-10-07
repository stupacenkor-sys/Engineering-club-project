import { expect, Locator, Page } from '@playwright/test';
import {
  areaFilters,
  levelFilters,
  AreaFilterName,
  LevelFilterName,
} from './filter-options';

type Labels = { area?: AreaFilterName; level?: LevelFilterName };

export class SkillCheckList {
  readonly items: Locator;

  constructor(page: Page) {
    this.items = page.locator('div.blueprint.card');
  }

  async verifyListByArea(areaLabel: AreaFilterName) {
    await this.verifyList({ area: areaLabel });
  }

  async verifyListByLevel(levelLabel: LevelFilterName) {
    await this.verifyList({ level: levelLabel });
  }

  async verifyListByAreaAndLevel(
    areaLabel: AreaFilterName,
    levelLabel: LevelFilterName,
  ) {
    await this.verifyList({ area: areaLabel, level: levelLabel });
  }

  private async verifyList(filter: Labels) {
    const cards = await this.items.all();
    expect(cards.length).toBeGreaterThan(0);

    for (const card of cards) {
      if (filter.area) {
        await expect(card).toContainText(areaFilters[filter.area].label);
      }

      if (filter.level) {
        await expect(card).toContainText(levelFilters[filter.level].label);
      }
    }
  }
}
