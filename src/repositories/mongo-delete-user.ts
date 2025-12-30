import { ObjectId } from 'mongodb';
import { iDeleteUserRepository } from '../controllers/delete-user/protocols';
import { mongoClient } from '../database/mongo';
import { user } from '../models/user';

export class mongoDeleteUserRepository implements iDeleteUserRepository {
    async deleteUser(id: string): Promise<user> {
        if (!id) {
            throw new Error('ID is required');
        }

        const user = await mongoClient.db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error('User not found');
        }

        await mongoClient.db.collection('users').findOneAndDelete({ _id: new ObjectId(id) });

        const { _id, ...userData } = user;

        return {
            id: _id.toString(),
            ...userData,
        } as user;
    }
}
