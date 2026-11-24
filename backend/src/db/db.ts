import { drizzle } from 'drizzle-orm/neon-serverless'

import ENV from '../config/env'
export const db = drizzle(ENV.DATABASE_URL)