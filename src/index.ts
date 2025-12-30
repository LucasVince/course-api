import express from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';


import { mongoClient } from './database/mongo';
import { connectRedis, redisClient } from './database/redisClient';

import usersRoutes from './routers/users-routes';
import coursesRoutes from './routers/courses-routes';
import regisRoutes from './routers/regis-routes';
import path from 'path';

const main = async () => {
    config();

    const app = express();

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(express.json());
    app.use(cors());
    // app.use(limiter);
    app.use(
        (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
            res.status(500).json({ message: err });
        },
    );

    app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

    app.use('/users', usersRoutes);
    app.use('/courses', coursesRoutes);
    app.use('/regis', regisRoutes);

    await mongoClient.connect();
    await connectRedis();

    process.on('SIGTERM', async () => {
        await mongoClient.client.close();
        await redisClient.quit();
        process.exit(0);
    });

    app.get('/', async (_req, res) => {
        res.send('Hello World');
    });

    app.listen(process.env.PORT, () => {
        console.log(`server on!!! running on port ${process.env.PORT}`);
    });
};

main().catch((err) => {
    if (err instanceof Error) {
        console.log(err.message);
    }
    console.log(err);

    process.exit(1);
});
