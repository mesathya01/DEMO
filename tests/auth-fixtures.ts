import { Page, test as base } from '@playwright/test';

type AuthFixtures = {
  authPage: Page;
};

export const test = base.extend<{}, AuthFixtures>({
  authPage: [async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'playwright/.auth/user.json',
    });
    const page = await context.newPage();

    await use(page);
    await context.close();
  }, { scope: 'worker' }],
});

export { expect } from '@playwright/test';
