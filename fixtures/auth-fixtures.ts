import fs from 'fs';
import { expect, Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';

type AuthFixtures = {
  authPage: Page;
};

export const test = base.extend<{}, AuthFixtures>({
  authPage: [async ({ browser }, use) => {
    const baseUrl = process.env.BASE_URL;
    const username = process.env.TEST_USERNAME;
    const password = process.env.TEST_PASSWORD;

    if (!baseUrl || !username || !password) {
      throw new Error('BASE_URL, TEST_USERNAME, and TEST_PASSWORD are required');
    }

    const authFile = 'playwright/.auth/user.json';
    fs.mkdirSync('playwright/.auth', { recursive: true });

    const context = await browser.newContext();
    const page = await context.newPage();
    const login = new LoginPage(page);

    await login.login(username, password, baseUrl);
  
    await context.storageState({ path: authFile });

    try {
      await use(page);
    } finally {
      await context.close();
    }
  }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';
