import { Page, Locator, expect } from '@playwright/test';

const titleText =
  'Every application you send, which CV went with it, and what came back.';
const rolesTextVacation = 'QA Engineer';

export class JobSearchPage {
  //декларація змінної в середені класу page але значення не прописуемо
  readonly page: Page;
  readonly title: Locator;
  readonly textBoxRoles: Locator;
  readonly updateLinksButton: Locator;
  searchRole?: Locator;

  //ініціалізація классу
  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', {
      name: 'Every application you send,',
    });
    this.textBoxRoles = page.getByRole('textbox', {
      name: 'Roles',
    });
    this.updateLinksButton = page.getByRole('button', {
      name: 'Update Links',
    });
  }

  async verifyTitle() {
    await expect(this.title).toHaveText(titleText);
  }

  async fillTextBoxRolesAndClickUpdateLinks() {
    await this.textBoxRoles.fill(rolesTextVacation);
    await this.updateLinksButton.click();
  }

  async verifyAddRoleSearch() {
    this.searchRole = this.page.getByRole('cell', { name: rolesTextVacation });
    await expect(this.searchRole).toBeVisible();
  }
}
