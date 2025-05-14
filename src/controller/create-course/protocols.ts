import { course } from '../../models/course';

export interface iCreateCourseRepository {
    createCourse(params: iCreateCourseParams): Promise<course>;
}

export interface iCreateCourseParams {
    name: string;
    description: string;
    hours: number;
    classes: number;
    modules: number;
}
