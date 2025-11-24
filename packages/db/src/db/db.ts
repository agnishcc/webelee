import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schemaGroup';
export { DrizzleError, TransactionRollbackError } from 'drizzle-orm/errors';
// for migrations
// eslint-disable-next-line turbo/no-undeclared-env-vars
export const connectionString = process.env.DB_URL as string;
export const client = postgres(connectionString);
const enableLogger = (process.env.ENABLE_DB_LOGGER === 'true') || false;
export const db = drizzle(client, { schema, logger: enableLogger });

//Postgres Error
export const PostgresError = postgres.PostgresError;