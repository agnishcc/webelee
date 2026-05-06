import dotenv from 'dotenv';
dotenv.config({
    path: '../../.env',
    debug: true,
});

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../schemaGroup';
import postgres from 'postgres';

const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql, { schema });
//Postgres Error
export const PostgresError = postgres.PostgresError;