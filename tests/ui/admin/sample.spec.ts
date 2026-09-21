import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
test.describe("Login", () => {
  test("admin can log in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto("/login");
    await loginPage.login(process.env.ADMIN_USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL("/dashboard");
  });
});
