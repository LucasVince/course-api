import { certificates } from './cetificates';

export interface user {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher';
    profilePicture: string;
    completedCourses: string[];
    certificates: certificates[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
