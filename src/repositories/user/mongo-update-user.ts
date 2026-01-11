import { ObjectId } from 'mongodb';
import { mongoClient } from '../../database/mongo';
import { iUpdateUserRepository, iUpdateUserParam } from '../../controllers/user/update-user/protocols';
import { user } from '../../models/user';
import { hash } from 'bcrypt';

export class mongoUpdateUserRepository implements iUpdateUserRepository {
    async updateUser(id: string, params: iUpdateUserParam): Promise<user> {
        if (!id) {
            throw new Error('ID is required');
        }

        const userToUpdate = await mongoClient.db
            .collection('users')
            .findOne({ _id: new ObjectId(id) });

        if (!userToUpdate) {
            throw new Error('User not found');
        }

        if (params.password) {
            const hashedPassword = await hash(params.password, 10);
            params.password = hashedPassword;
        }

        if (params.role) {
            if (params.role != 'student' && params.role != 'teacher') {
                throw new Error('Role needs to be either student or teacher');
            }
        }

        await mongoClient.db
            .collection('users')
            .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

        const user = await mongoClient.db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error('User not updated');
        }

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
