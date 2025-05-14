import express from 'express';
import { config } from 'dotenv';
import { mongoClient } from './database/mongo';
import { getUsersFactory } from './factories/get-users-factor';
import { getUserByIdFactory } from './factories/get-user-by-id-factor';
import { getCoursesFactory } from './factories/get-courses-factor';
import { registerUserFactory } from './factories/register-user-factor';
import { logger } from './utils/logger';
import { authToken } from './middleware/authToken';
import { getCourseByIdFactory } from './factories/get-course-by-id-factor';
import { loginFactory } from './factories/login-facotr';
import { createCourseFactory } from './factories/create-course-factor';

const main = async () => {
    const app = express();

    app.use(express.json());

    config();

    await mongoClient.connect();

    app.get('/', async (req, res) => {
        res.send('Hello World');
    });

    app.get('/users', async (req, res) => {
        const GetUsers = getUsersFactory();

        const response = await GetUsers.handle();

        res.status(response.statusCode).json(response.body);
    });

    app.get('/users/:id', async (req, res) => {
        const GetUserById = getUserByIdFactory();

        const httpRequest = {
            body: req.body,
            params: req.params as { id: string },
            headers: req.headers,
            query: req.query,
            method: req.method as 'GET',
        };

        const response = await GetUserById.handle(httpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.get('/courses', async (req, res) => {
        const GetCourses = getCoursesFactory();

        const response = await GetCourses.handle();

        res.status(response.statusCode).json(response.body);
        logger.info('Response from get courses:', response);
    });

    app.get('/courses/:id', async (req, res) => {
        const GetCourseById = getCourseByIdFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params as { id: string },
            headers: req.headers,
            query: req.query,
            method: req.method as 'GET',
        };

        const response = await GetCourseById.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.post('/courses', async (req, res) => {
        const createCourse = createCourseFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
            method: req.method as 'POST',
        };

        const response = await createCourse.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.post('/register', async (req, res) => {
        const RegisterUser = registerUserFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
            method: req.method as 'POST',
        };

        const response = await RegisterUser.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
        logger.info('Response from post user:', response);
    });

    app.post('/login', async (req, res) => {
        const Login = loginFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
            method: req.method as 'POST',
        };

        const response = await Login.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.listen(process.env.PORT, () => {
        console.log(`server on!!! running on port ${process.env.PORT}`);
        logger.info(`server on!!! running on port ${process.env.PORT}`);
    });
};

main();
