import { test, expect } from '../../src/fixtures/api.fixtures';
import { envConfig } from '../../src/config/env.config';

enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
}

const existingStudentId = envConfig.studentAnalysisStudentId;

const studentAnalysisNegativeCases = [
  {
    title: 'studentId is missing',
    body: {},
    expectedStatus: HttpStatus.BadRequest,
  },
  {
    title: 'studentId is empty',
    body: { studentId: '' },
    expectedStatus: HttpStatus.BadRequest,
  },
  {
    title: 'student does not exist',
    body: { studentId: 'non-existing-student-id' },
    expectedStatus: HttpStatus.NotFound,
  },
] as const;

test.describe('AI Student Analysis API', () => {
  for (const testCase of studentAnalysisNegativeCases) {
    test(`should return ${testCase.expectedStatus} when ${testCase.title}`, async ({
      aiApi,
    }) => {
      await test.step(`Send request when ${testCase.title}`, async () => {
        const response = await aiApi.generateStudentAnalysisWithBody(
          testCase.body,
        );

        expect(response.status()).toBe(testCase.expectedStatus);
      });
    });
  }

  const testWithStudentId = existingStudentId ? test : test.skip;

  testWithStudentId(
    'should return NDJSON stream when admin generates student analysis',
    async ({ aiApi }) => {
      await test.step('Generate AI analysis for existing student', async () => {
        const response = await aiApi.generateStudentAnalysis(
          existingStudentId!,
        );

        expect(response.status()).toBe(HttpStatus.OK);
        expect(response.headers()['content-type']).toContain(
          'application/x-ndjson',
        );

        const body = await response.text();
        const lines = body.trim().split('\n').filter(Boolean);

        expect(lines.length).toBeGreaterThan(0);

        for (const line of lines) {
          const event = JSON.parse(line);

          expect(event.type).toBeDefined();
        }
      });
    },
  );
});
