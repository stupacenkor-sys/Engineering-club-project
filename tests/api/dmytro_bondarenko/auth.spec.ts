import { test } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { Sidebar } from '@pages/../sidebar';
import { AuthApi } from '@pages/../api/auth.api';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.PASSWORD!;

test.describe('Authentication API', () => {
  test.beforeEach('Authenticating as admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebar = new Sidebar(page);

    await loginPage.goto();
    await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    await sidebar.verifyURL.dashboard();
  });

  test('should return a valid status when sending a request to the auth/providers endpoint', async ({
    request,
  }) => {
    const authApi = new AuthApi(request);

    await test.step('Send a request to the auth/providers endpoint', async () => {
      await authApi.sendAuthProvidersRequest();
    });

    await test.step('Validate the response status code is 200', async () => {
      await authApi.ValidateProvidersResponseStatus(200);
    });
  });

  test('should validate response when returning a request from the auth/providers endpoint', async ({
    request,
  }) => {
    const authApi = new AuthApi(request);

    await test.step('Send a request to the auth/providers endpoint', async () => {
      await authApi.sendAuthProvidersRequest();
    });

    await test.step('Validate the response data', async () => {
      await authApi.validateProvidersCountGraterThenZero();
      await authApi.validateAuthProvidersResponseData();
    });
  });
});
