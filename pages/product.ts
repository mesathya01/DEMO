import { Page, Locator } from '@playwright/test';

export class ProductPage {
   readonly page: Page;
   readonly title: Locator;
   readonly filter: Locator;
   readonly addToCartButton: (productName: string) => Locator;
   readonly cart: Locator;
   readonly productname: Locator;

   constructor(page: Page) {
      this.page = page;
      this.title = page.locator('.app_logo');
      this.filter = page.locator('[data-test="product-sort-container"]');
      this.addToCartButton = (productName: string) =>
         page.locator(`[data-test="add-to-cart-${productName}"]`);
      this.cart = page.locator('[data-test="shopping-cart-link"]');
      this.productname = page.locator('[data-test="inventory-item-name"]');
   }

   async filterProducts(option: string) {
      await this.filter.selectOption(option);
   }

   async addToCart(productName: string) {
      await this.addToCartButton(productName).click();
      await this.cart.click();
   }
}