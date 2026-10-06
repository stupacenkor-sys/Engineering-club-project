import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  constructor(private readonly request: APIRequestContext) {}

  async getSession() {
    return this.request.get('/api/auth/session');
  }
}
