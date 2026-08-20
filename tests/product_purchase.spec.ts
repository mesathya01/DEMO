import { Page } from '@playwright/test';
import { test, expect } from '../fixtures/auth-fixtures';
import { LoginPage } from '../pages/login';
import {
  applicationName,
  checkoutCustomer,
  checkoutData,
  checkoutStepOneUrlPattern,
  inventoryUrlPattern,
  mockImageFailure,
  products,
  products_filter,
  selectedProductId
} from '../data/testData';

test.describe('Purchase flow', () => {
  
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ authPage }) => {
    page = authPage;
    loginPage = new LoginPage(page);
  });

  test('Application name validation ', async () => {
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.title).toHaveText(applicationName);
  });

  test('Add the product to cart', async () => {
    await loginPage.filterProducts(products_filter[3]);
    await loginPage.addToCart(selectedProductId);
    expect(await loginPage.productname.textContent()).toContain(products[selectedProductId]);
  });


  //This website Does not support API but if it works this mock of the API works 
  // test('checkout is blocked when the cart page returns 500', async () => {
  //   const cartRoute = '**/cart.html';
  //   let mockResponseStatus: number | undefined;

  //   await page.route(cartRoute, async (route) => {
  //     mockResponseStatus = mockImageFailure.status;
  //     await route.fulfill({
  //       status: mockImageFailure.status,
  //       contentType: mockImageFailure.contentType,
  //       body: mockImageFailure.body
  //     });
  //   }, { times: 1 });

  //   try {
  //     await page.reload();
  //     await expect.poll(() => mockResponseStatus).toBe(mockImageFailure.status);
  //     await expect(loginPage.checkout).not.toBeVisible();
  //   } finally {
  //     await page.unroute(cartRoute);
  //     await page.reload();
  //   }
  // });

  test('checkout shows an error when first name is missing', async () => {
    await loginPage.openCheckout();
    await expect(page).toHaveURL(checkoutStepOneUrlPattern);
    await loginPage.submitEmptyCheckoutForm();
    await expect(loginPage.checkoutError).toHaveText(checkoutData.firstNameRequiredError);
  });

  test('checkout', async () => {
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

