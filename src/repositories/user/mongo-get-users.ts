import { user } from '../../models/user';
import { iGetUsersRepositoy } from '../../controllers/user/get-users/protocols';
import { mongoClient } from '../../database/mongo';
export class mongoGetUsersRepository implements iGetUsersRepositoy {
    async getUsers(): Promise<user[]> {
        const users =
            (await mongoClient.db.collection<Omit<user, 'id'>>('users').find({}).toArray()) || [];

        return users.map((user) => {
            return {
                id: user._id.toHexString(),
                ...user,
            };
        });
    }
}
