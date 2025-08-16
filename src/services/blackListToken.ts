import { log } from 'console';
import { badRequest, ok } from '../controllers/helpers';
import { HttpResponse } from '../controllers/protocols';
import { redisClient } from '../database/redisClient';
import { logger } from '../utils/logger';

export const blacklistToken = async (token: string): Promise<HttpResponse<string>> => {
    const blacklisted = await redisClient.get(`blacklist:${token}`);

    if (blacklisted) {
        logger.error('Token already blacklisted');
        return badRequest('Token already blacklisted');
    }

    await redisClient.set(`blacklist:${token}`, 'true', {
        EX: 60 * 60,
    });

    logger.info('Token blacklisted successfully');

    logger.info('Logout successfully');
    return ok('Logout successfully');
};
