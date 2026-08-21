import { expect, Page, Locator } from '@playwright/test';

export class CheckoutPage {
   readonly page: Page;
   readonly checkout: Locator;
   readonly checkoutInfo: Locator;
   readonly checkoutError: Locator;
   readonly checkoutSummary: Locator;
   readonly checkoutComplete: Locator;
   readonly firstName: Locator;
   readonly lastName: Locator;
   readonly postalCode: Locator;
   readonly continue: Locator;
   readonly finish: Locator;

   constructor(page: Page) {
      this.page = page;
      this.checkout = page.locator('[data-test="checkout"]');
      this.checkoutInfo = page.locator('[data-test="title"]');
      this.checkoutError = page.locator('[data-test="error"]');
      this.checkoutSummary = page.locator('[data-test="checkout-summary-container"]');
      this.checkoutComplete = page.locator('[data-test="checkout-complete-container"]');
      this.firstName = page.locator('[data-test="firstName"]');
      this.lastName = page.locator('[data-test="lastName"]');
      this.postalCode = page.locator('[data-test="postalCode"]');
      this.continue = page.locator('[data-test="continue"]');
      this.finish = page.locator('[data-test="finish"]');
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

   async submitEmptyCheckoutForm() {
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
}