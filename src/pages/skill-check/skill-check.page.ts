import { Page } from '@playwright/test';
import { SkillCheckFilter } from './skill-check-filter';
import { SkillCheckList } from './skill-check-list';

export class SkillCheckPage {
  readonly filter: SkillCheckFilter;
  readonly list: SkillCheckList;

  constructor(readonly page: Page) {
    this.filter = new SkillCheckFilter(page);
    this.list = new SkillCheckList(page);
  }

  async clickLevelBasicAndVerifyList() {
    await this.filter.clickLevelFilter.basic();
    await this.filter.verifyLevelFilter.basic();

    await this.list.verifyListByLevel('basic');
  }
}
