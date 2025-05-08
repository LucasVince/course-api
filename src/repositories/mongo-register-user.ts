import { iRegisterUserParams, iRegisterUserRepositoy } from '../controller/register-user/protocols';
import { mongoClient } from '../database/mongo';
import { user } from '../models/user';
import { logger } from '../utils/logger';

export class mongoRegisterUserRepository implements iRegisterUserRepositoy {
    async registerUser(params: iRegisterUserParams): Promise<user> {
        logger.info('getCoursesRepository start');
        const { name, email, role, password } = params;

        const existingUser = await mongoClient.db.collection('users').findOne({ email });

        if (existingUser) {
            logger.error('getCoursesRepository error: user already exists with this email:', {
                email,
            });
            throw new Error('User already exists');
        }

        const newUser = await mongoClient.db.collection('users').insertOne({
            name,
            email,
            role,
            password,
            completedCourses: [],
            certificates: [],
        });

        logger.info('User created successfully:', { newUser });

        const user = await mongoClient.db.collection<Omit<user, 'id'>>('users').findOne({
            _id: newUser.insertedId,
        });

        if (!user) {
            logger.error('User was not created');
            throw new Error('User not created');
        }

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        };
    }
}
