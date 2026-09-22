# Engineering-club-project

End-to-end test automation framework for the Engineering Club platform built with **Playwright** and **TypeScript**. This project covers both UI flows using the **Page Object Model (POM)** and direct **API** testing.


## ⚡ Quick Start

Get up and running in under two minutes:

Ensure you have [Node.js](https://nodejs.org/) installed on your machine:
* **Node.js**: `v18.0` or higher (LTS recommended)
* **npm**: `v9.0` or higher

Verify your local installation:
```bash
node -v
npm -v
```

```bash
# 1. Clone the repository
git clone <REPOSITORY_URL>
cd Engineering-club-project

# 2. Install project dependencies
npm install

# 3. Install required Playwright browser binaries
npx playwright install --with-deps chromium

# 4. Create your local .env from the template and fill in the values
cp .env.example .env    # PowerShell: Copy-Item .env.example .env

# 5. Run UI tests in headed mode
npm run test:ui:headed
```

## 🔐 Environment Setup (`.env`)

Base URL and credentials are read from a local `.env` file (loaded by `dotenv` in `playwright.config.ts`). The file is listed in `.gitignore` and **must never be committed**. Only the `.env.example` template is tracked in git.

| Variable | Description |
| :--- | :--- |
| `BASE_URL` | Base URL of the environment under test |
| `STUDENT_USERNAME` | Email of the student demo account |
| `MENTOR_USERNAME` | Email of the mentor demo account |
| `ADMIN_USERNAME` | Email of the admin demo account |
| `PASSWORD` | Shared password of the demo accounts |

Use only the predefined demo accounts from `src/config/users.config.ts` (see the rules below).

## ⚠️ Critical Team Rules (Do & Don't)

* ⛔ **DO NOT use `/sign-up`:** The dev environment runs an active `seed-guard`. Creating new accounts corrupts database state and blocks future seed resets. Use **only predefined demo accounts** from `src/config/users.config.ts`.


## 📋 NPM Scripts Reference

Run tests conveniently using predefined npm shortcuts:

| Command | Description |
| :--- | :--- |
| `npm test` | Run all test suites (UI + API) in headless mode |
| `npm run test:ui` | Run only browser UI tests |
| `npm run test:ui:headed` | Run UI tests with visible browser windows (interactive) |
| `npm run test:api` | Run fast headless API tests |
| `npm run test:report` | Open the latest HTML test report in your browser |


## 📌 TODO / Workflow & Conventions

- [ ] **Naming Conventions**:
  - Узгодити неймінг тестів (структура `describe` / `test`, файли `.spec.ts`, теги, POM).
- [ ] **Code Conventions**:
  - Стиль коду, форматування (Prettier/ESLint).
- [ ] **Git Commit Rules**:
  - Стандарт комітів (Conventional Commits).
- [ ] **GitFlow / Branching Strategy**:
  - Стратегія гілкування та процес PR / Code Review.