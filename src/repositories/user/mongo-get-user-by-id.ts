import { ObjectId } from 'mongodb';
import { iGetUserByIdRepository } from '../../controllers/user/get-user-by-id/protocols';
import { mongoClient } from '../../database/mongo';
import { user } from '../../models/user';
export class mongoGetUserByIdRepository implements iGetUserByIdRepository {
    async getUserById(id: string): Promise<user> {
        if (!id) {
            throw new Error('please specify an id');
        }

        const user = await mongoClient.db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error('user not found');
        }

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
