export interface user {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher';
    profilePicture: string;
    completedCourses: string[];
    certificates: string[];
    password: string;
}
