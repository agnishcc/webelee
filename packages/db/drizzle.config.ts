// import 'dotenv/config';
import type { Config } from 'drizzle-kit';




export default {
    schema: 'src/schema/',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        url: process.env.DB_URL!,
    },
} satisfies Config;