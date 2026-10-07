import { Page, Locator, expect } from '@playwright/test';

export class AssignmentsPage {
  readonly page: Page;
  readonly allFilter: Locator;
  readonly assignmentsTable: Locator;
  readonly assignmentRows: Locator;
  readonly statusCells: Locator;

  constructor(page: Page) {
    this.page = page;
    this.allFilter = page.getByRole('radio', { name: 'All', exact: true });
    this.assignmentsTable = page.getByRole('table').filter({
      has: page.getByRole('columnheader', { name: 'ASSIGNMENT' }),
    });
    this.assignmentRows = this.assignmentsTable.locator('tbody tr');
    this.statusCells = this.assignmentRows.locator('td:last-child');
  }

  async goto() {
    await this.page.goto('/assignments');
  }

  async verifySelfURL() {
    await expect(this.page).toHaveURL(/\/assignments/);
  }

  async expectAllFilterSelected() {
    await expect(this.allFilter).toBeChecked();
  }

  async expectTableShowsAllStatuses() {
    await expect(this.assignmentRows.first()).toBeVisible();

    const statuses = (await this.statusCells.allTextContents()).map((status) =>
      status.split('·')[0].trim().toLowerCase(),
    );

    expect(new Set(statuses).size).toBeGreaterThan(1);
  }
}
