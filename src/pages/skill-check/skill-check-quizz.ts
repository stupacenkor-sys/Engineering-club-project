import { expect, Locator, Page } from '@playwright/test';
import { Quizz } from '../../test-data/quizzes';

export class SkillCheckQuizz {
  readonly page: Page;

  readonly title: Locator;
  readonly url: RegExp;
  readonly description: Locator;
  readonly questionsNumber: Locator;
  readonly timeLimitInMinutes: Locator;
  readonly passMarkInPercent: Locator;
  readonly xpGained: Locator;

  constructor(page: Page, quiz: Quizz) {
    this.page = page;
    this.title = page.getByRole('heading', { name: quiz.title });
    this.url = quiz.urlPattern;
    this.description = page.getByText(quiz.description);
    this.questionsNumber = page
      .getByRole('rowheader', { name: 'Questions' })
      .locator('..')
      .getByText(String(quiz.questionsNumber));

    this.timeLimitInMinutes = page
      .getByRole('rowheader', { name: 'Time' })
      .locator('..')
      .getByText(String(quiz.timeLimitInMinutes));

    this.passMarkInPercent = page
      .getByRole('rowheader', { name: 'Pass mark' })
      .locator('..')
      .getByText(String(quiz.passMarkInPercent));

    this.xpGained = page
      .getByRole('rowheader', { name: 'Reward' })
      .locator('..')
      .getByText(String(quiz.xpGained ?? 'already earned'));
  }

  async verifyQuizzURL() {
    await expect(this.page).toHaveURL(this.url);
  }
}
