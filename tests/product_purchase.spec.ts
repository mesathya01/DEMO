import { Page } from '@playwright/test';
import { test, expect } from './auth-fixtures';
import { LoginPage } from './pages/login';
import {
  applicationName,
  checkoutCustomer,
  checkoutData,
  mockImageFailure,
  products,
  products_filter,
  selectedProductId
} from './testData';

test.describe('Purchase flow', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ authPage }) => {
    page = authPage;
    loginPage = new LoginPage(page);

    await page.goto('/inventory.html');
  });

  test('Application name validation ', async () => {
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.title).toHaveText(applicationName);
  });

  test('Add the product to cart', async () => {
    await loginPage.filterProducts(products_filter[3]);
    await loginPage.addToCart(selectedProductId);
    expect(await loginPage.productname.textContent()).toContain(products[selectedProductId]);
  });

  test('checkout continues when a product image returns 500', async () => {
    const imageRoute = mockImageFailure.route;

    await page.route(imageRoute, async (route) => {
      await route.fulfill({
        status: mockImageFailure.status,
        contentType: mockImageFailure.contentType,
        body: mockImageFailure.body
      });
    }, { times: 1 });

    try {
      await page.reload();
      await expect(loginPage.checkout).toBeVisible();
    } finally {
      await page.unroute(imageRoute);
    }
  });

  test('checkout', async () => {
    await loginPage.openCheckout();
    await expect(loginPage.checkoutInfo).toHaveText(checkoutData.infoTitle);
    await loginPage.checkoutProduct(
      checkoutCustomer.firstName,
      checkoutCustomer.lastName,
      checkoutCustomer.postalCode
    );
    const summaryPattern = new RegExp(
      `${checkoutData.paymentInformation}[\\s\\S]*${checkoutData.shippingInformation}[\\s\\S]*${checkoutData.priceTotal}[\\s\\S]*${checkoutData.itemTotal}[\\s\\S]*${checkoutData.tax}[\\s\\S]*${checkoutData.total}`
    );
    await loginPage.validateCheckoutSummary(summaryPattern);
    await loginPage.finishCheckout();
    await expect(loginPage.checkoutComplete).toContainText(checkoutData.completionMessage);
  });

  test.afterAll(async () => {
    await loginPage.Logout();
  });
});

