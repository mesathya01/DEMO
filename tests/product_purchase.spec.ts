import { test, expect } from '../fixtures/auth-fixtures';
import { LoginPage } from '../pages/login';
import { ProductPage } from '../pages/product';
import { CheckoutPage } from '../pages/checkout';
import {
  applicationName,
  checkoutCustomer,
  checkoutData,
  checkoutStepOneUrlPattern,
  inventoryUrlPattern,
  products,
  products_filter,
  selectedProductId
} from '../data/testData';


let loginPage: LoginPage;
let productPage: ProductPage;
let checkoutPage: CheckoutPage;

test.describe('Purchase flow', () => {
  test.beforeAll(async ({ authPage }) => {
    loginPage = new LoginPage(authPage);
    productPage = new ProductPage(authPage);
    checkoutPage = new CheckoutPage(authPage);
  });

  test('Application name validation ', async ({ authPage }) => {
    await expect(authPage).toHaveURL(inventoryUrlPattern);
    await expect(productPage.title).toBeVisible();
    await expect(productPage.title).toHaveText(applicationName);
  });

  test('Add the product to cart', async ({ authPage }) => {
    await productPage.filterProducts(products_filter[3]);
    await productPage.addToCart(selectedProductId);
    expect(await productPage.productname.textContent()).toContain(products[selectedProductId]);
  });

  // This website does not support the mocked API scenario, so the example stays disabled.
  // test('uses the mock fixture', async ({ mockPage }) => {
  //   await mockPage.reload();
  // });

  test('checkout shows an error when first name is missing', async ({ authPage }) => {
    await checkoutPage.openCheckout();
    await expect(authPage).toHaveURL(checkoutStepOneUrlPattern);
    await checkoutPage.submitEmptyCheckoutForm();
    await expect(checkoutPage.checkoutError).toHaveText(checkoutData.firstNameRequiredError);
  });

  test('checkout', async ({ authPage }) => {
    await checkoutPage.checkoutProduct(
      checkoutCustomer.firstName,
      checkoutCustomer.lastName,
      checkoutCustomer.postalCode
    );

    const summaryPattern = new RegExp(
      `${checkoutData.paymentInformation}[\\s\\S]*${checkoutData.shippingInformation}[\\s\\S]*${checkoutData.priceTotal}[\\s\\S]*${checkoutData.itemTotal}[\\s\\S]*${checkoutData.tax}[\\s\\S]*${checkoutData.total}`
    );
    await checkoutPage.validateCheckoutSummary(summaryPattern);
    await checkoutPage.finishCheckout();
    await expect(checkoutPage.checkoutComplete).toContainText(checkoutData.completionMessage);
  });

  test.afterAll(async () => {
    await loginPage.Logout();
  });
});

