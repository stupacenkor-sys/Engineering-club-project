import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class AuthApi {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async sendRequest() {
    const response = await this.request.get('/api/auth/providers');
    return response;
  }

  verifyStatusCode(response: APIResponse, expectedStatusCode: number) {
    expect(response.status()).toBe(expectedStatusCode);
  }
}
