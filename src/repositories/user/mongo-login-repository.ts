import { iLoginParams, iLoginRepository } from '../../controllers/user/login/protocols';
import { mongoClient } from '../../database/mongo';
import { user } from '../../models/user';
import { compare } from 'bcrypt';

export class mongoLoginRepository implements iLoginRepository {
    async Login(params: iLoginParams): Promise<user> {
        const { id, email, password } = params;

        const user = await mongoClient.db.collection('users').findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        compare(password, user.password, (err, _result) => {
            if (err) {
                throw new Error('wrong password');
            }
        });

        const { _id, ...rest } = user;

        return {
            id: _id.toHexString(),
            ...rest,
        } as user;
    }
}
