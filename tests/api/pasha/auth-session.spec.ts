import { test, expect } from '../../../src/fixtures/api.fixtures';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

test.describe('Auth Session API', () => {
  test('should return current session for authenticated user', async ({ authApi }) => {
    await test.step('Get and verify current session', async () => {
      const response = await authApi.getSession();

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body.user).toBeDefined();
      expect(body.user.id).toBeDefined();
      expect(body.user.email).toBe(ADMIN_EMAIL);
      expect(body.user.role).toBe('ADMIN');
      expect(body.expires).toBeDefined();
    });
  });

  test('should return empty session for signed-out user', async ({ request }) => {
    await test.step('Get and verify session for signed-out user', async () => {
      const response = await request.get('/api/auth/session');

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toEqual(null);
    });
  });
});
