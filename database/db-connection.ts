import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

export async function executeQuery(
    query: string,
    params: unknown[] = []
) {
    const result = await pool.query(query, params);
    return result.rows;
}

export async function closeDatabase() {
    await pool.end();
}