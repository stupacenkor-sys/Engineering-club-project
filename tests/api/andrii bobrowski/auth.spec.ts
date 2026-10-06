import { test } from '@pages/../fixtures/api.fixtures';
import { AuthApi } from '../../../src/api/auth.api';

test.describe.only('Authentication API', () => {
  let authApi: AuthApi;

  test.beforeEach(async ({ adminRequest }) => {
    authApi = new AuthApi(adminRequest);
  });

  test('Should verify status code', async () => {
    await test.step('send request and verify', async () => {
      const response = await authApi.sendRequest();
      await authApi.verifyStatusCode(response, 200);
    });
  });
});
