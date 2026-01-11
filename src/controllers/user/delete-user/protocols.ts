import { user } from '../../../models/user';

export interface iDeleteUserRepository {
    deleteUser(id: string): Promise<user>;
}
