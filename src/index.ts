import express from 'express';
import { config } from 'dotenv';
import { mongoClient } from './database/mongo';
import { getUsersFactory } from './factories/get-users-factor';
import { getCoursesFactory } from './factories/get-courses-factor';
import { registerUserFactory } from './factories/register-user-factor';
import { logger } from './utils/logger';

const main = async () => {
    const app = express();

    app.use(express.json());

    config();

    await mongoClient.connect();

    app.get('/users', async (req, res) => {
        const GetUsers = getUsersFactory();

        const response = await GetUsers.handle();

        res.status(response.statusCode).json(response.body);
        logger.info('Response from get users:', response);
    });

    app.get('/courses', async (req, res) => {
        const GetCourses = getCoursesFactory();

        const response = await GetCourses.handle();

        res.status(response.statusCode).json(response.body);
        logger.info('Response from get courses:', response);
    });

    app.post('/register', async (req, res) => {
        const RegisterUser = registerUserFactory();

        const HttpRequest = {
            body: req.body,
            headers: req.headers,
            params: req.params,
            query: req.query,
            method: req.method as 'POST',
        };

        const response = await RegisterUser.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
        logger.info('Response from post user:', response);
    });

    app.listen(process.env.PORT, () => {
        console.log(`server on!!! running on port ${process.env.PORT}`);
        logger.info(`server on!!! running on port ${process.env.PORT}`);
    });
};

main();
