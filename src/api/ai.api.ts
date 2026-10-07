import { APIRequestContext } from '@playwright/test';

const STUDENT_ANALYSIS_ENDPOINT = '/api/ai/student-analysis';

export class AiApi {
  constructor(private readonly request: APIRequestContext) {}

  async sendChatMessage(message: string) {
    return this.request.post('/api/ai/chat', {
      data: { message },
    });
  }

  async generateStudentAnalysis(studentId: string) {
    return this.request.post(STUDENT_ANALYSIS_ENDPOINT, {
      data: { studentId },
    });
  }

  async generateStudentAnalysisWithBody(data: object) {
    return this.request.post(STUDENT_ANALYSIS_ENDPOINT, {
      data,
    });
  }
}
