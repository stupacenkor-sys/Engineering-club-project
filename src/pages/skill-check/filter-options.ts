export const areaFilters = {
  all: { label: 'All', urlPattern: /\/quizzes$/ },
  programmingTs: { label: 'Programming · TypeScript', urlPattern: /\?area=PROGRAMMING_TS/ },
  qaTheory: { label: 'QA theory', urlPattern: /\?area=QA_THEORY/ },
  sdlc: { label: 'SDLC & processes', urlPattern: /\?area=SDLC_PROCESSES/ },
  projectExperience: { label: 'Project experience', urlPattern: /\?area=PROJECT_EXPERIENCE/ },
  ciCd: { label: 'CI/CD', urlPattern: /\?area=CI_CD/ },
  databases: { label: 'Databases', urlPattern: /\?area=DATABASES/ },
  ai: { label: 'AI', urlPattern: /\?area=AI/ },
  git: { label: 'Git', urlPattern: /\?area=GIT/ },
  projectTools: { label: 'Project tools', urlPattern: /\?area=PROJECT_TOOLS/ },
  mobile: { label: 'Mobile testing', urlPattern: /\?area=MOBILE_TESTING/ },
  performance: { label: 'Performance testing', urlPattern: /\?area=PERFORMANCE/ },
} as const;

export const levelFilters = {
  all: { label: 'All', urlPattern: /\/quizzes$/ },
  basic: { label: 'Basic', urlPattern: /[?&]level=BASIC/ },
  intermediate: { label: 'Intermediate', urlPattern: /[?&]level=INTERMEDIATE/ },
  advanced: { label: 'Advanced', urlPattern: /[?&]level=ADVANCED/ },
} as const;

export type AreaFilterName = keyof typeof areaFilters;
export type LevelFilterName = keyof typeof levelFilters;