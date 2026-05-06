import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { Pool } from 'pg'
dotenv.config({
    path: '../../.env',
});
console.log("env", process.env.DB_URL);


export default defineConfig({
    schema: './src/schemaGroup.ts',
    out: './migrations',
    dialect: 'postgresql',
    verbose: true,
    dbCredentials: {
        database: process.env.DB_NAME!,
        host: process.env.DB_HOST!,
        password: process.env.DB_PASSWORD!,
        user: process.env.DB_USER!,
        port: 5432,
        ssl: false
    },
    migrations: {
        table: '__drizzle_migration',
        schema: 'public'
    },

});