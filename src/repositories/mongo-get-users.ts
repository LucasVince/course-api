import { user } from '../models/user';
import { iGetUsersRepositoy } from '../controllers/get-users/protocols';
import { mongoClient } from '../database/mongo';
import { logger } from '../utils/logger';

export class mongoGetUsersRepository implements iGetUsersRepositoy {
    async getUsers(): Promise<user[]> {
        logger.info('getUsersRepository start');
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
