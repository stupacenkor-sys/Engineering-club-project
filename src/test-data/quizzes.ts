type QuizzBase = {
  title: string;
  urlPattern: RegExp;
  description: string;
  questionsNumber: number;
  timeLimitInMinutes: number;
  passMarkInPercent: number;
  xpGained: number;
};

type NotAttemptedQuizz = QuizzBase & {
  status: 'Not attempted';
};

type AttemptedQuizz = QuizzBase & {
  status: 'Passed' | 'Not passed yet' | 'In progress';
  attemptsNumber: number;
  bestMarkInPercent: number;
};

export type Quizz = NotAttemptedQuizz | AttemptedQuizz;

export const ciCdQuizz: AttemptedQuizz = {
  title: 'CI/CD: основи для тестувальника',
  urlPattern: /\/ci-cd-basics/,
  description:
    'Що таке pipeline, чим continuous integration відрізняється від delivery і deployment, і що робити тестувальнику, коли збірка червона. Без Docker і YAML — лише принципи.',
  questionsNumber: 8,
  timeLimitInMinutes: 15,
  passMarkInPercent: 70,
  xpGained: 50,
  status: 'Passed',
  attemptsNumber: 2,
  bestMarkInPercent: 88,
};
