
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

type AuthStatusCode = 200 | 302;

const apiPaths = {
  authProviders: '/api/auth/providers',
};

type ProviderData = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type AuthApiResponse = Record<string, ProviderData>;

export class AuthApi {
  private readonly request: APIRequestContext;
  private responseData?: ProviderData[];
  private responseStatus?: number;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getSession() {
    return this.request.get('/api/auth/session');
  }
  async sendAuthProvidersRequest() {
    const response: APIResponse<AuthApiResponse> = await this.request.get(
      apiPaths.authProviders,
    );
    this.responseData = Object.values(await response.json());
    this.responseStatus = response.status();
  }

  async ValidateProvidersResponseStatus(statusCode: AuthStatusCode) {
    if (this.responseStatus) {
      expect(this.responseStatus).toBe(statusCode);
    }
  }

  async validateProvidersCountGraterThenZero() {
    if (this.responseData) {
      expect(this.responseData.length).toBeGreaterThan(0);
    }
  }

  async validateAuthProvidersResponseData() {
    if (this.responseData) {
      this.responseData.forEach((provider) => {
        expect(provider).toEqual({
          id: expect.any(String),
          name: expect.any(String),
          type: expect.any(String),
          signinUrl: expect.any(String),
          callbackUrl: expect.any(String),
        });
      });
    }
  }
}
