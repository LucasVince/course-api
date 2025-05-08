import { ObjectId } from 'mongodb';
import { iGetUserByIdRepository } from '../controller/get-user-by-id/protocols';
import { mongoClient } from '../database/mongo';
import { user } from '../models/user';
import { logger } from '../utils/logger';

export class mongoGetUserByIdRepository implements iGetUserByIdRepository {
    async getUserById(id: string): Promise<user> {
        logger.info('getUserByIdRepository start');

        const user = await mongoClient.db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!id) {
            logger.error('please specify an id');
            throw new Error('please specify an id');
        }

        if (!user) {
            logger.error('getUserByIdRepository error: user not found');
            throw new Error('user not found');
        }

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
