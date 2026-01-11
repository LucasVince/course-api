import { user } from '../../models/user';

export interface iLoginRepository {
    Login(params: user): Promise<user>;
}

export interface iLoginParams {
    id: string;
    email: string;
    password: string;
}
