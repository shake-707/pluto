export const getDatabaseUrl = () => {
    const db_url = process.env.DATABASE_URL;
    if (!db_url){
        console.error('failed to get db url');
        process.exit(1);
    }

    return db_url;
};