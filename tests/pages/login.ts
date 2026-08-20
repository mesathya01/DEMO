

import { expect, Page, Locator } from '@playwright/test';

export class LoginPage {
   readonly page: Page;
   readonly username: Locator;
   readonly password: Locator;
   readonly submit: Locator;
   readonly title: Locator;
   readonly filter: Locator;
   readonly addToCartButton: (productName: string) => Locator;
   readonly cart: Locator;
   readonly checkout: Locator;
   readonly checkoutInfo: Locator;
   readonly checkoutSummary: Locator;
   readonly checkoutComplete: Locator;
   readonly firstName: Locator;
   readonly lastName: Locator;
   readonly postalCode: Locator;
   readonly continue: Locator;
   readonly finish: Locator;
   readonly openmenu: Locator;
   readonly logout: Locator;
   readonly productname: Locator;
   
   constructor(page: Page) {
      this.page = page;
      this.username = page.locator('[data-test="username"]');
      this.password = page.locator('[data-test="password"]');
      this.submit = page.locator('[data-test="login-button"]');
      this.title = page.locator('.app_logo');
      this.filter = page.locator('[data-test="product-sort-container"]');
      this.addToCartButton = (productName: string) =>
         page.locator(`[data-test="add-to-cart-${productName}"]`);

      this.cart = page.locator('[data-test="shopping-cart-link"]');
   this.checkout = page.locator('[data-test="checkout"]');
   this.checkoutInfo = page.locator('[data-test="title"]');
   this.checkoutSummary = page.locator('[data-test="checkout-summary-container"]');
   this.checkoutComplete = page.locator('[data-test="checkout-complete-container"]');
   this.firstName = page.locator('[data-test="firstName"]');
   this.lastName = page.locator('[data-test="lastName"]');
   this.postalCode = page.locator('[data-test="postalCode"]');
   this.continue = page.locator('[data-test="continue"]');
   this.finish = page.locator('[data-test="finish"]');
      this.openmenu = page.getByRole('button', { name: 'Open Menu' });
      this.logout = page.locator('[data-test="logout-sidebar-link"]');
      this.productname = page.locator('[data-test="inventory-item-name"]');

   }

   async login(user: string, pass: string, url: string) {
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.submit.click();
   }

   async filterProducts(option: string) {
      await this.filter.selectOption(option);
   }

   async addToCart(productName: string) {
      await this.addToCartButton(productName).click();
      await this.cart.click();
   }

   async openCheckout() {
      await this.checkout.click();
   }

   async checkoutProduct(firstName: string, lastName: string, postalCode: string) {
      await this.firstName.fill(firstName);
      await this.lastName.fill(lastName);
      await this.postalCode.fill(postalCode);
      await this.continue.click();
   }

   async getCheckoutSummaryText(): Promise<string> {
      return this.checkoutSummary.innerText();
   }

   async validateCheckoutSummary(summaryPattern: RegExp) {
      const checkoutSummaryText = await this.getCheckoutSummaryText();

      expect(checkoutSummaryText).toMatch(summaryPattern);
   }

   async finishCheckout() {
      await this.finish.click();
   }

   async Logout() {
      await this.openmenu.click();
      await this.logout.click();
   }
}
//}
