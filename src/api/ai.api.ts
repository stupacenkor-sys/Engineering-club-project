import { APIRequestContext } from '@playwright/test';

export class AiApi {
  constructor(private readonly request: APIRequestContext) {}

  async sendChatMessage(message: string) {
    return this.request.post('/api/ai/chat', {
      data: { message },
    });
  }
}
