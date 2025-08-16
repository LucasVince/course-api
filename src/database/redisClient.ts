import { createClient } from 'redis';
import { logger } from '../utils/logger';

export const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
    await redisClient.connect();
    console.log('connected to redis');
    logger.info('connected to redis');
};
