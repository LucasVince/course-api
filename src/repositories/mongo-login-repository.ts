import { iLoginParams, iLoginRepository } from '../controller/login/protocols';
import { mongoClient } from '../database/mongo';
import { user } from '../models/user';
import { logger } from '../utils/logger';
import { compare } from 'bcrypt';

export class mongoLoginRepository implements iLoginRepository {
    async Login(params: iLoginParams): Promise<user> {
        logger.info('LoginRepository start');
        const { email, password } = params;

        const user = await mongoClient.db.collection('users').findOne({ email });

        if (!user) {
            logger.error('User not found');
            throw new Error('User not found');
        }

        compare(password, user.password, (err, _result) => {
            if (err) {
                logger.error('wrong password');
                throw new Error('wrong password');
            }
        });

        logger.info('login don sucessfully');

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
