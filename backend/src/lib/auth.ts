import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db"; // your drizzle instance
import * as schema from "../db/schema"
import env from "../config/env";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: env.NODE_ENV === "production" ? 8 : 1,
    }
});