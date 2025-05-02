export interface user {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    completedCourses: string[];
    certificates: string[];
    password: string;
}
