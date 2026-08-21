
import { Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly page: Page;
   readonly username: Locator;
   readonly password: Locator;
   readonly submit: Locator;
   readonly openmenu: Locator;
   readonly logout: Locator;

   constructor(page: Page) {
      this.page = page;
      this.username = page.locator('[data-test="username"]');
      this.password = page.locator('[data-test="password"]');
      this.submit = page.locator('[data-test="login-button"]');
      this.openmenu = page.getByRole('button', { name: 'Open Menu' });
      this.logout = page.locator('[data-test="logout-sidebar-link"]');
   }

   async login(user: string, pass: string, url: string) {
      await this.page.goto(url);
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.submit.click();
   }

   async Logout() {
      await this.openmenu.click();
      await this.logout.click();
   }
}

