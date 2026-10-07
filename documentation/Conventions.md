# QA Style Convention

## 1. Naming Conventions

- **Файли тестів:** обов'язково розширення `.spec.ts`, назва в kebab-case (наприклад `auth-login.spec.ts`).
- **Page Object Model (POM):**
  1. Файли сторінок: `[name].page.ts` у директорії `pages/` (наприклад, `login.page.ts`).
  2. Назви класів: `PascalCase` із суфіксом `Page` (наприклад, `LoginPage`).
  3. Методи: починаються з дієслова дії (`fillCredentials()`, `clickSubmit()`, `getErrorMessage()`).
- **Структура тестів (describe / test):**
  1. `test.describe`: назва фічі чи компонента.
  2. `test`: шаблон `should [очікуваний результат] when [умова або дія]`.
  3. Приклад:

```ts
test.describe('Login Form', () => {
  test('should display validation error when email is invalid', async ({ page }) => {
    // test code
  });
});
```

## 2. Locator Strategy

**Пріоритет 1: Тестові атрибути (найстабільніші)**
Використовувати призначені для тестів атрибути (`data-testid`, `data-test`):
```ts
page.getByTestId('submit-btn')
```

**Пріоритет 2: Ролі та доступність (User-facing / Accessibility)**
Шукати елементи так, як їх бачить реальний користувач:
```ts
page.getByRole('button', { name: 'Log in' })
page.getByLabel('Password')
page.getByPlaceholder('Enter your email')
```

**Пріоритет 3: Текстові селектори**
Тільки якщо текст унікальний і не змінюється динамічно:
```ts
page.getByText('Welcome back')
```

**Пріоритет 4: CSS-селектори**
Використовувати тільки за відсутності альтернатив, прив'язуючись до семантичних класів або `id`:
```ts
page.locator('#checkout-form')
```

**СУВОРО ЗАБОРОНЕНО:**
- Повні/абсолютні XPath (`/html/body/div[2]/div/form/button`).
- Автогенеровані динамічні CSS-класи стилів (наприклад, `.Button_sc-123xyz`, `.css-19z01`).

## 3. Code Conventions

- **Інструменти:** використовуємо ESLint та Prettier.
- **Базові правила форматування:**
  1. Лапки: одинарні (`'...'`).
  2. Крапка з комою: завжди в кінці рядка (`;`).
- **Асинхронність та очікування:**
  1. Заборонено використовувати хардкодні затримки як `page.waitForTimeout(5000)`.
  2. Забороняє створювати тести, які не мають жодної перевірки `expect(...)`.
- **Секретні дані (логіни, паролі, токени) та base URL передаються виключно через змінні середовища (`.env`).**

## 4. Git Commit Rules

**Формат:** `<type>(<scope>): <короткий опис в теперішньому часі>`

- **test:** створення або редагування автотестів, додавання нового Page Object.
- **fix:** виправлення впавшого або нестабільного (flaky) тесту, виправлення локатора чи помилки в інфраструктурі.
- **refactor:** зміна структури коду без зміни функціональності.
- **chore:** оновлення залежностей, конфігурацій або CI/CD.
- **docs:** зміни лише у документації.

**Приклад:**
```
test(auth): add negative scenarios for login form
fix(cart): update checkout button selector
chore(deps): update playwright to version 1.48
```

## 5. GitFlow & PR Process

- **Основні гілки:**
  1. `main` — головна гілка репозиторію. Код у ній завжди має бути робочим. Прямі комміти в `main` категорично заборонені.
- **Робочі гілки:**
  1. Створюються від актуальної `main`.
  2. Формат: `<тип>/<номер-таски>-<короткий-опис>`.
  3. Приклади: `feature/C104-auth-tests`.
- **Правила оформлення Pull Request (PR):**
  1. Формат: `[Case-ID] Короткий опис зробленого`.
  2. Приклад: `[C102-C105] Automate cart and checkout test cases`.
- **Вимоги до перевірок:**
  1. Усі автоматичні пайплайни в GitHub Actions повинні бути «зеленими».
  2. Якщо перевірки впали — автор зобов'язаний спочатку виправити помилки, перш ніж кликати колег на рев'ю.
- **Процес Code Review та злиття:**
  1. Мінімум 1 Approve: злиття в `main` дозволено тільки після схвалення іншим інженером.
  2. Тип злиття: Merge — усі проміжні коміти з робочої гілки об'єднуються в один чистий коміт в історії `main`.

## 6. API Tests

**Авторизація.** Окремого API для логіну немає, тому API-тести працюють через сесію з UI: фікстура `adminRequest` логіниться під адміном через `LoginPage` і віддає `page.request`. Він бере ті ж cookie, що й браузер, тож усі запити йдуть від імені адміна. Токени й cookie руками в тестах не підставляємо.

**Структура:**
```
src/api/ai.api.ts               ← клієнт: методи, які шлють запити
src/fixtures/api.fixtures.ts    ← adminRequest + фікстури клієнтів (aiApi, ...)
tests/api/ai-chat.spec.ts       ← тести
```

**Клієнти (аналог Page Object, тільки для API):**
1. Файл: `[розділ].api.ts` у `src/api/` — один файл на розділ API (`ai`, `messages`, ...).
2. Клас: `PascalCase` із суфіксом `Api` (`AiApi`, `MessagesApi`).
3. Методи називаються за дією, а не за HTTP-методом: `sendChatMessage()`, а не `postChat()`.
4. Метод повертає відповідь як є (`APIResponse`), перевірок (`expect`) у клієнті немає — вони тільки в тестах.
5. Шлях пишемо повністю, як у Swagger: `'/api/ai/chat'`.

```ts
export class AiApi {
  constructor(private readonly request: APIRequestContext) {}

  async sendChatMessage(message: string) {
    return this.request.post('/api/ai/chat', { data: { message } });
  }
}
```

**Новий клієнт** підключаємо фікстурою в `api.fixtures.ts`:
```ts
messagesApi: async ({ adminRequest }, use) => {
  await use(new MessagesApi(adminRequest));
},
```

**Тести:**
1. Файли лежать у `tests/api/`, назва за правилами з розділу 1 (`ai-chat.spec.ts`).
2. `test` імпортуємо з фікстур, а не з `@playwright/test`, інакше `aiApi` не буде доступний.
3. Кроки обгортаємо в `test.step`, як в UI-тестах.
4. Перевіряємо не лише статус, а й тіло відповіді, якщо воно щось важливе повертає.

```ts
import { test, expect } from '../../src/fixtures/api.fixtures';

test.describe('AI Assistant API', () => {
  test('should return 200 when sending a question to AI chat', async ({ aiApi }) => {
    await test.step('Send a question to the AI chat', async () => {
      const response = await aiApi.sendChatMessage('What is Playwright?');
      expect(response.status()).toBe(200);
    });
  });
});
```

**Тестові дані.** Якщо тест щось створює (розмову, повідомлення, запис), по можливості видаляємо це після тесту, щоб не засмічувати акаунт.

**Запуск:** `npm run test:api`.
