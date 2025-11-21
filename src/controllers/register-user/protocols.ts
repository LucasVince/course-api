import { user } from '../../models/user';

export interface iRegisterUserRepositoy {
    registerUser(params: iRegisterUserParams): Promise<user>;
}

export interface iRegisterUserParams {
    name: string;
    email: string;
    role: 'student' | 'teacher';
    password: string;
    profilePicture: string
}
