import { test, expect } from '../../src/fixtures/api.fixtures';

test.describe('AI Assistant API', () => {
  test('should return a valid response when sending a message to AI chat', async ({ aiApi }) => {
    await test.step('Send a question to the AI chat', async () => {
      const response = await aiApi.sendChatMessage('What is Playwright?');
      expect(response.ok()).toBeTruthy();
    });
  });
});
