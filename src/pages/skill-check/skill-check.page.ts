import { Page } from '@playwright/test';
import { SkillCheckFilter } from './skill-check-filter';
import { SkillCheckList } from './skill-check-list';
import { SkillCheckQuizz } from './skill-check-quizz';
import { ciCdQuizz } from '../../test-data/quizzes';

export class SkillCheckPage {
  readonly filter: SkillCheckFilter;
  readonly list: SkillCheckList;
  private quizz?: SkillCheckQuizz;

  constructor(readonly page: Page) {
    this.filter = new SkillCheckFilter(page);
    this.list = new SkillCheckList(page);
  }

  async clickLevelBasicAndVerifyList() {
    await this.filter.clickLevelFilter.basic();
    await this.filter.verifyLevelFilter.basic();

    await this.list.verifyListByLevel('basic');
  }

  async clickAreaQATheoryAndVerifyList() {
    await this.filter.clickAreaFilter.qaTheory();
    await this.filter.verifyAreaFilter.qaTheory();

    await this.list.verifyListByArea('qaTheory');
  }

  async clickLevelBasicAreaQAAndVerifyList() {
    await this.filter.clickLevelFilter.basic();
    await this.filter.verifyLevelFilter.basic();

    await this.filter.clickAreaFilter.qaTheory();
    await this.filter.verifyAreaFilter.qaTheory();

    await this.list.verifyListByAreaAndLevel('qaTheory', 'basic');
  }

  async clickCICDQuizzAndVerifyRedirect() {
    await this.list.clickListItemTitle(ciCdQuizz.title);
    this.quizz = new SkillCheckQuizz(this.page, ciCdQuizz);
    await this.quizz.verifyQuizzURL();
  }
}
