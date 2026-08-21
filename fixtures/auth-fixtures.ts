import fs from 'fs';
import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';

type AuthFixtures = {
  authPage: Page;
};

export const test = base.extend<{}, AuthFixtures>({
  authPage: [async ({ browser }, use) => {
    const baseUrl = process.env.BASE_URL;
    const authFile = 'playwright/.auth/user.json';
    fs.mkdirSync('playwright/.auth', { recursive: true });
    const hasAuthState = fs.existsSync(authFile);

    if (!baseUrl || (!hasAuthState && (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD))) {
      throw new Error('BASE_URL, TEST_USERNAME, and TEST_PASSWORD are required');
    }

    const context = await browser.newContext(
      hasAuthState ? { storageState: authFile } : undefined
    );
    const page = await context.newPage();

    if (hasAuthState) {
      await page.goto(baseUrl);
    } else {
      const login = new LoginPage(page);
      await login.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!, baseUrl);
      await context.storageState({ path: authFile });
    }

    try {
      await use(page);
    } finally {
      await context.close();
    }
  }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';
