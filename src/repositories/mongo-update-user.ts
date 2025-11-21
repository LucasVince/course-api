import { ObjectId } from 'mongodb';
import { mongoClient } from '../database/mongo';
import { logger } from '../utils/logger';
import { iUpdateUserRepository, iUpdateUserParam } from '../controllers/update-user/protocols';
import { user } from '../models/user';
import { hash } from 'bcrypt';

export class mongoUpdateUserRepository implements iUpdateUserRepository {
    async updateUser(id: string, params: iUpdateUserParam): Promise<user> {
        if (!id) {
            logger.error('ID is required');
            throw new Error('ID is required');
        }

        const userToUpdate = await mongoClient.db
            .collection('users')
            .findOne({ _id: new ObjectId(id) });

        if (!userToUpdate) {
            logger.error('User not found');
            throw new Error('User not found');
        }

        if (params.password) {
            const hashedPassword = await hash(params.password, 10);
            params.password = hashedPassword;
        }

        if (params.role) {
            if (params.role != 'student' && params.role != 'teacher') {
                logger.error('Role needs to be either student or teacher');
                throw new Error('Role needs to be either student or teacher');
            }
        }

        await mongoClient.db
            .collection('users')
            .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

        const user = await mongoClient.db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error('User not created');
        }

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
