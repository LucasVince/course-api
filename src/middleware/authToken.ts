/// <reference path="../../types/express.d.ts" />

import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { iJwtPayload } from '../../types/JwtPayload';
import { logger } from '../utils/logger';

export const authToken: RequestHandler = (req, res, next) => {
    const header = req.headers['authorization'];
    logger.info('Authorization header:');
    logger.info(header);
    const token = header && header.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized: token not found' });
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
};
