import {test as setup , expect as setupExpect} from '@playwright/test';

import{LoginPage} from '../pages/login';
import fs from 'fs';
const authFile = 'playwright/.auth/user.json';

setup('Login and save authentication state ', async ({page}) => {

    fs.mkdirSync('playwright/.auth', { recursive: true });
    const baseUrl = process.env.BASE_URL?.trim();
    const username = process.env.TEST_USERNAME?.trim();
    const password = process.env.TEST_PASSWORD?.trim();

    setupExpect(baseUrl, 'BASE_URL must be configured').toBeTruthy();
    setupExpect(username, 'TEST_USERNAME must be configured').toBeTruthy();
    setupExpect(password, 'TEST_PASSWORD must be configured').toBeTruthy();

    await page.goto(baseUrl!);
    const loginPage = new LoginPage(page);

    await loginPage.login(username!, password!, baseUrl!);

    await setupExpect(page).toHaveURL(/\/inventory\.html$/);

    await page.context().storageState({path: authFile});
});

