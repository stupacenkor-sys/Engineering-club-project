import { test as base, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { AiApi } from '../api/ai.api';
import { AuthApi } from '../api/auth.api';

type ApiFixtures = {
  adminRequest: APIRequestContext;
  aiApi: AiApi;
  authApi: AuthApi;
};

export const test = base.extend<ApiFixtures>({
  // API can only be used after logging in through the UI,
  // so we log in as admin and send requests with the same session
  adminRequest: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_EMAIL!, process.env.PASSWORD!);
    await expect(page).toHaveURL('/dashboard');

    await use(page.request);
  },

  aiApi: async ({ adminRequest }, use) => {
    await use(new AiApi(adminRequest));
  },

  authApi: async ({ adminRequest }, use) => {
    await use(new AuthApi(adminRequest));
  },
});

export { expect };
