import pgp from 'pg-promise';
//import  env  from './get-environment-vars';

const db_url = process.env.DATABASE_URL;
    if (!db_url){
        console.error('failed to get db url');
        process.exit(1);
    }

if (!db_url) {
  console.error('could get db url environment');
  process.exit(1);
}

const db = pgp()(db_url);

const testConnection = async () => {
  try {
    const dbConnected = await db.connect();
    console.log('connected to db');
  } catch (err) {
    console.error('failed to connect to db', err);
  }
};

testConnection();
export default  db;
