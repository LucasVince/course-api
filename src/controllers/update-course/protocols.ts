import { course } from '../../models/course';

export interface iUpdateCourseRepository {
    updateCourse(id: string, params: iUpdateCoursesParam): Promise<course>;
}

export interface iUpdateCoursesParam {
    name?: string;
    description?: string;
    hours?: number;
    classes?: number;
    modules?: number;
}
