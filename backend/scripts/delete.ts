import { db } from '../src/db/db';

async function main() {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Refusing to wipe a production database.');
    }
    if (!process.argv.includes('--yes')) {
        throw new Error(
            'This deletes EVERYTHING (tables, views, triggers, functions, enums). Re-run with --yes to confirm.'
        );
    }

    console.log('dropping everything...');

    // One statement per call so it works with any driver (neon-http, pg, postgres-js).
    // Drizzle keeps its migration history in the "drizzle" schema; drop it too,
    // otherwise `drizzle-kit migrate` will think migrations were already applied.
    await db.execute(`DROP SCHEMA IF EXISTS drizzle CASCADE;`);
    await db.execute(`DROP SCHEMA IF EXISTS public CASCADE;`);
    await db.execute(`CREATE SCHEMA public;`);
    await db.execute(`GRANT ALL ON SCHEMA public TO public;`);

    console.log('db wiped!');
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error('failed:', err);
        process.exit(1);
    });