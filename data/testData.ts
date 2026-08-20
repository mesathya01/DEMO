export const products_filter = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];

export const applicationName = 'Swag Labs';
export const inventoryUrlPattern = /\/inventory\.html$/;
export const checkoutStepOneUrlPattern = /\/checkout-step-one\.html$/;

export const products: Record<string, string> = {
  'sauce-labs-backpack': 'Sauce Labs Backpack',
  'sauce-labs-bike-light': 'Sauce Labs Bike Light',
  'sauce-labs-bolt-t-shirt': 'Sauce Labs Bolt T-Shirt',
  'sauce-labs-fleece-jacket': 'Sauce Labs Fleece Jacket',
  'sauce-labs-onesie': 'Sauce Labs Onesie',
  'test.allthethings() t-shirt (red)': 'Test.allTheThings() T-Shirt (Red)'
};

export const selectedProductId = 'sauce-labs-bike-light';

const randomValue = (prefix: string): string =>
  `${prefix}${Math.floor(Math.random() * 100000)}`;

export const checkoutCustomer = {
  firstName: randomValue('First'),
  lastName: randomValue('Last'),
  postalCode: String(Math.floor(10000 + Math.random() * 90000))
};

export const checkoutData = {
  infoTitle: 'Checkout: Your Information',
  firstNameRequiredError: 'Error: First Name is required',
  paymentInformation: 'Payment Information:\\s*SauceCard #31337',
  shippingInformation: 'Shipping Information:\\s*Free Pony Express Delivery!',
  priceTotal: 'Price Total',
  itemTotal: 'Item total:\\s*\\$\\d+\\.\\d{2}',
  tax: 'Tax:\\s*\\$\\d+\\.\\d{2}',
  total: 'Total:\\s*\\$\\d+\\.\\d{2}',
  completionMessage: 'Thank you for your order!'
};

export const mockImageFailure = {
  route: '**/*.jpg',
  status: 500,
  contentType: 'text/plain',
  body: 'Mocked image failure'
};
