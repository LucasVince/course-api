import { user } from '../../models/user';

export interface iUpdateUserRepository {
    updateUser(id: string, params: iUpdateUserParam): Promise<user>;
}

export interface iUpdateUserParam {
    name?: string;
    email?: string;
    role?: 'student' | 'teacher';
    completedCourses?: string[];
    profilePicture?: string;
    certificates?: string[];
    password?: string;
}
