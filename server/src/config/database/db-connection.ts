import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from './schema';

const db_url = process.env.DATABASE_URL;

if (!db_url) {
  console.error('could get db url environment');
  process.exit(1);
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: db_url,
  }),
});

const db = new Kysely<Database>({
  dialect,
});

export default db;