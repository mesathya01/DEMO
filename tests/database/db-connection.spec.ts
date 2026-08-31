import { test, expect } from '@playwright/test';
import { executeQuery } from '../../database/db-connection';
import { getProductByCode } from '../../database/productQueries';

const productValidationData = [
    { productCode: 'sauce-labs-backpack', productName: 'Sauce Labs Backpack', price: 29.99 },
    { productCode: 'sauce-labs-bike-light', productName: 'Sauce Labs Bike Light', price: 9.99 },
    { productCode: 'sauce-labs-bolt-t-shirt', productName: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
    { productCode: 'sauce-labs-fleece-jacket', productName: 'Sauce Labs Fleece Jacket', price: 49.99 },
    { productCode: 'sauce-labs-onesie', productName: 'Sauce Labs Onesie', price: 7.99 },
    { productCode: 'test.allthethings() t-shirt (red)', productName: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 }
];

async function validateProductInDb(productCode: string, expectedName: string, expectedPrice: number) {
    const products = await getProductByCode(productCode);

    expect(products.length).toBe(1);
    expect(products[0].product_code).toBe(productCode);
    expect(products[0].product_name).toBe(expectedName);
    expect(Number(products[0].price)).toBe(expectedPrice);
    expect(products[0].active).toBe(true);
}

test('Verify database connection', async () => {
    const result = await executeQuery(
        'SELECT current_database() AS database_name'
    );

    expect(result[0].database_name).toBe('sauce_demo');
});

test('Verify configured products exist in database', async () => {
    for (const { productCode, productName, price } of productValidationData) {
        await validateProductInDb(productCode, productName, price);
    }
});