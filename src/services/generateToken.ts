import { sign } from 'jsonwebtoken';
export const generateToken = (payload: object): string => {
    return sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
};
