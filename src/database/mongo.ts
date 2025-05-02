import { Db, MongoClient } from 'mongodb';

export const mongoClient = {
    client: undefined as unknown as MongoClient,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.MONGO_URL || 'localhost:27017';
        const username = process.env.MONGO_USERNAME;
        const password = process.env.MONGO_PASSWORD;

        const client = new MongoClient(url, { auth: { username, password } });
        const db = client.db('users-db');

        this.client = client;
        this.db = db;

        console.log('connected successfully to db');
    },
};
