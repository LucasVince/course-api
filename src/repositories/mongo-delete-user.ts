import { ObjectId } from 'mongodb';
import { iDeleteUserRepository } from '../controller/delete-user/protocols';
import { mongoClient } from '../database/mongo';
import { user } from '../models/user';
import { logger } from '../utils/logger';

export class mongoDeleteUserRepository implements iDeleteUserRepository {
    async deleteUser(id: string): Promise<user> {
        if (!id) {
            logger.error('ID is required');
            throw new Error('ID is required');
        }

        const user = await mongoClient.db
            .collection('users')
            .findOneAndDelete({ _id: new ObjectId(id) });

        if (!user) {
            logger.error('Course not found');
            throw new Error('Course not found');
        }

        const { _id, ...userData } = user;

        return {
            id: _id.toString(),
            ...userData,
        } as user;
    }
}
