import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const NODE_ENV_VARIANTS = ['development', 'production'] as const;

if (!process.env.NODE_ENV) throw new Error('Missing required environment variable: NODE_ENV');
if (!NODE_ENV_VARIANTS.includes(process.env.NODE_ENV as typeof NODE_ENV_VARIANTS[number])) throw new Error(`Invalid NODE_ENV value: ${process.env.NODE_ENV}`);
if (!process.env.PORT) throw new Error('Missing required environment variable: PORT');
if (!process.env.AWS_ACCESS_KEY_ID) throw new Error('Missing required environment variable: AWS_ACCESS_KEY_ID');
if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('Missing required environment variable: AWS_SECRET_ACCESS_KEY');
if (!process.env.AWS_REGION) throw new Error('Missing required environment variable: AWS_REGION');

if (process.env.NODE_ENV === 'development') {
    if (!process.env.DATABASE_URL_DEVELOPMENT) throw new Error('Missing required environment variable: DATABASE_URL');
}
if (process.env.NODE_ENV === 'production') {
    if (!process.env.DATABASE_URL) throw new Error('Missing required environment variable: DATABASE_URL');
}

const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: (process.env.NODE_ENV === 'development'
        ? process.env.DATABASE_URL_DEVELOPMENT
        : process.env.DATABASE_URL) as string,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION
};
export default ENV;

