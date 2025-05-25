import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { mongoClient } from './database/mongo';
import { connectRedis, redisClient } from './database/redisClient';
import { getUsersFactory } from './factories/get-users-factor';
import { getUserByIdFactory } from './factories/get-user-by-id-factor';
import { getCoursesFactory } from './factories/get-courses-factor';
import { registerUserFactory } from './factories/register-user-factor';
import { logger } from './utils/logger';
import { authToken } from './middleware/authToken';
import { getCourseByIdFactory } from './factories/get-course-by-id-factor';
import { loginFactory } from './factories/login-facotr';
import { createCourseFactory } from './factories/create-course-factor';
import { deleteCourseFactory } from './factories/delete-course-factor';
import { LogoutController } from './controller/logout/logout-controller';
import { deleteUserFactory } from './factories/delete-user-factor';

const main = async () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(
        (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            logger.error(err);
            res.status(500).json({ message: err });
        },
    );

    config();

    await mongoClient.connect();
    await connectRedis();

    process.on('SIGTERM', async () => {
        logger.info('closing server...');
        await mongoClient.client.close();
        await redisClient.quit();
        process.exit(0);
    });

    app.get('/', async (req, res) => {
        res.send('Hello World');
    });

    app.get('/users', authToken, async (req, res) => {
        const GetUsers = getUsersFactory();

        const response = await GetUsers.handle();

        res.status(response.statusCode).json(response.body);
    });

    app.get('/users/:id', authToken, async (req, res) => {
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

    app.get('/courses', authToken, async (req, res) => {
        const GetCourses = getCoursesFactory();

        const response = await GetCourses.handle();

        res.status(response.statusCode).json(response.body);
        logger.info('Response from get courses:', response);
    });

    app.get('/courses/:id', authToken, async (req, res) => {
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

    app.delete('/users/:id', authToken, async (req, res) => {
        const deleteUser = deleteUserFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params as { id: string },
            headers: req.headers,
            query: req.query,
            method: req.method as 'DELETE',
        };

        const response = await deleteUser.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.delete('/courses/:id', authToken, async (req, res) => {
        const DeleteUser = deleteCourseFactory();

        const HttpRequest = {
            body: req.body,
            params: req.params as { id: string },
            headers: req.headers,
            query: req.query,
            method: req.method as 'DELETE',
        };

        const response = await DeleteUser.handle(HttpRequest);

        res.status(response.statusCode).json(response.body);
    });

    app.post('/logout', authToken, async (req, res) => {
        const logout = new LogoutController();

        const httpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
            method: req.method as 'POST',
        };

        const response = await logout.handle(httpRequest);

        res.status(response.statusCode).json(response.body);
        logger.info('Response from logout:', response);
    });

    app.listen(process.env.PORT, () => {
        console.log(`server on!!! running on port ${process.env.PORT}`);
        logger.info(`server on!!! running on port ${process.env.PORT}`);
    });
};

main().catch((err) => {
    if (err instanceof Error) {
        console.log(err.message);
    }
    console.log(err);

    process.exit(1);
});
