import express from 'express';
import { config } from 'dotenv';
import { mongoClient } from './database/mongo';
import { getUsersFactory } from './factories/get-users-factor';
import { getCoursesFactory } from './factories/get-courses-factor';
import { registerUserFactory } from './factories/register-user-factor';

const main = async () => {
    const app = express();

    app.use(express.json());

    config();

    await mongoClient.connect();

    app.get('/users', async (req, res) => {
        const GetUsers = getUsersFactory();

        const response = await GetUsers.handle();

        res.status(response.statusCode).json(response.body);
    });

    app.get('/courses', async (req, res) => {
        const GetCourses = getCoursesFactory();

        const response = await GetCourses.handle();

        res.status(response.statusCode).json(response.body);
    });

    app.post('/register', async (req, res) => {
        const RegisterUser = registerUserFactory();

        const response = await RegisterUser.handle(req.body);

        res.status(response.statusCode).json(response.body);
    });

    app.listen(process.env.PORT, () =>
        console.log(`server on!!! running on port ${process.env.PORT}`),
    );
};

main();
