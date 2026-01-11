import { user } from '../../../models/user';

export interface iGetUserByIdRepository {
    getUserById(id: string): Promise<user>;
}
