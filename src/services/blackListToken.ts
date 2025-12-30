import { log } from 'console';
import { badRequest, ok } from '../controllers/helpers';
import { HttpResponse } from '../controllers/protocols';
import { redisClient } from '../database/redisClient';

export const blacklistToken = async (token: string): Promise<HttpResponse<string>> => {
    const blacklisted = await redisClient.get(`blacklist:${token}`);

    if (blacklisted) {
        return badRequest('Token already blacklisted');
    }

    await redisClient.set(`blacklist:${token}`, 'true', {
        EX: 60 * 60,
    });
    return ok('Logout successfully');
};
