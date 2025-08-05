import pgp from 'pg-promise';
import { getDatabaseUrl } from './get-enviroment-variables';

const db_url = getDatabaseUrl();

const db = pgp()(db_url);

async () => {
    try{
        const dbConnection = db.connect();
        console.log('connected to db');
    } catch (err) {
        console.error('failed to connect to db',err);
        process.exit(1);
    }
}

export default db;