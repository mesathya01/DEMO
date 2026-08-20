import {test as setup , expect as setupExpect} from '@playwright/test';

import{LoginPage} from '../pages/login';
import fs from 'fs';
const authFile = 'playwright/.auth/user.json';

setup('Login and save authentication state ', async ({page}) => {

    fs.mkdirSync('playwright/.auth', { recursive: true });
    await page.goto('https://www.saucedemo.com/');
    const loginPage = new LoginPage(page);

    await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!, process.env.BASE_URL!);

    await setupExpect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await page.context().storageState({path: authFile});
});

