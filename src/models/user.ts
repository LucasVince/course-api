export interface user {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher';
    completedCourses: string[];
    certificates: string[];
    password: string;
}
