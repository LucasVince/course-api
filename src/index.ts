import express from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import { logger } from './utils/logger';

import { mongoClient } from './database/mongo';
import { connectRedis, redisClient } from './database/redisClient';

import usersRoutes from './routers/users-routes';
import coursesRoutes from './routers/courses-routes';
import regisRoutes from './routers/regis-routes';

const main = async () => {
    config();

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(
        (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
            logger.error(err);
            res.status(500).json({ message: err });
        },
    );

    app.use('/users', usersRoutes);
    app.use('/courses', coursesRoutes);
    app.use('/regis', regisRoutes);

    await mongoClient.connect();
    await connectRedis();

    process.on('SIGTERM', async () => {
        logger.info('closing server...');
        await mongoClient.client.close();
        await redisClient.quit();
        process.exit(0);
    });

    app.get('/', async (_req, res) => {
        res.send('Hello World');
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
