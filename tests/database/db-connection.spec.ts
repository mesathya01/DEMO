import { test, expect } from '@playwright/test';
import { executeQuery } from '../../database/db-connection';
import { getProductByCode } from '../../database/productQueries';

test('Verify database connection', async () => {
    const result = await executeQuery(
        'SELECT current_database() AS database_name'
    );

    expect(result[0].database_name)
        .toBe('sauce_demo');
});

test('Verify Sauce Labs Bike Light exists in database', async () => {

    const products = await getProductByCode(
        'sauce-labs-bike-light'
    );

    expect(products.length).toBe(1);

    expect(products[0].product_code)
        .toBe('sauce-labs-bike-light');

    expect(products[0].product_name)
        .toBe('Sauce Labs Bike Light');

    expect(Number(products[0].price))
        .toBe(9.99);

    expect(products[0].active)
        .toBe(true);
});