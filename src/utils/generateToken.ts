import { sign } from 'jsonwebtoken';
import { logger } from './logger';

export const generateToken = (payload: object): string => {
    logger.info('generating token....');
    return sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
};
