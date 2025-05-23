/// <reference path="../../types/express.d.ts" />

import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { iJwtPayload } from '../../types/JwtPayload';
import { logger } from '../utils/logger';
import { redisClient } from '../database/redisClient';

export const authToken: RequestHandler = async (req, res, next) => {
    const header = req.headers['authorization'];
    logger.info('Authorization header:');
    logger.info(header);
    const token = header && header.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: token not found' });
        return;
    }

    try {
        const isBlackListed = await redisClient.get(`blacklist:${token}`);

        if (isBlackListed) {
            res.status(401).json({ message: 'Unauthorized: token is blacklisted' });
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized: invalid token' });
                return;
            }

            req.user = decoded as iJwtPayload;
            next();
        });
    } catch (err) {
        if (err instanceof Error) {
            logger.error(err.message);
            res.status(401).json({ message: err.message });
            return;
        }
        logger.error(err);
    }
};
