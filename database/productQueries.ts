import { executeQuery } from "./db-connection";

export async function getProductByCode(productCode: string) {
    return executeQuery(
        `
        SELECT product_code, product_name, price, active
        FROM products
        WHERE product_code = $1
        `,
        [productCode]
    );
}