import { user } from '../../models/user';

export interface iRegisterUserRepositoy {
    registerUser(params: user): Promise<user>;
}

export interface iRegisterUserParams {
    name: string;
    email: string;
    role: 'student' | 'teacher';
    password: string;
}
