import express from 'express';
import {config} from 'dotenv';
import {mongoClient} from './database/mongo'
import { getUsersFactory } from './factories/get-users-factor';

const main = async () => {
    const app = express();
    config();
    await mongoClient.connect();

    app.get('/users', async (req, res) => {
        const GetUsersController = getUsersFactory();

        const response = await GetUsersController.handle();

        res.status(response.statusCode).json(response.body);
    })

    app.listen(process.env.PORT, () => console.log(`server on!!! running on port ${process.env.PORT}`));
}

main();