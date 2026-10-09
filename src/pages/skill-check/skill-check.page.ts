import { Page } from '@playwright/test';
import { SkillCheckFilterComponent } from './skill-check-filter';
import { SkillCheckListComponent } from './skill-check-list';
import { SkillCheckQuizzComponent } from './skill-check-quizz';
import { ciCdQuizz } from '../../test-data/quizzes';

export class SkillCheckPage {
  readonly filter: SkillCheckFilterComponent;
  readonly list: SkillCheckListComponent;
  private quizz?: SkillCheckQuizzComponent;

  constructor(readonly page: Page) {
    this.filter = new SkillCheckFilterComponent(page);
    this.list = new SkillCheckListComponent(page);
  }

  async verifyListAfterClickLevelBasic() {
    await this.filter.clickLevelFilter.basic();
    await this.filter.verifyLevelFilter.basic();

    await this.list.verifyListByLevel('basic');
  }

  async verifyListAfterClickAreaQATheory() {
    await this.filter.clickAreaFilter.qaTheory();
    await this.filter.verifyAreaFilter.qaTheory();

    await this.list.verifyListByArea('qaTheory');
  }

  async verifyListAfterClickLevelAndAreaFilter() {
    await this.filter.clickLevelFilter.basic();
    await this.filter.verifyLevelFilter.basic();

    await this.filter.clickAreaFilter.qaTheory();
    await this.filter.verifyAreaFilter.qaTheory();

    await this.list.verifyListByAreaAndLevel('qaTheory', 'basic');
  }

  async verifyRedirectAfterClickCICDQuizz() {
    await this.list.clickListItemTitle(ciCdQuizz.title);
    this.quizz = new SkillCheckQuizzComponent(this.page, ciCdQuizz);
    await this.quizz.verifyQuizzURL();
  }
}
