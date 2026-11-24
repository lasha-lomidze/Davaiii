import { defineConfig } from 'drizzle-kit'
import ENV from './env'

const config = defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: ENV.DATABASE_URL,
    },
});

export default config;