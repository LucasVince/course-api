import { course } from '../../models/course';

export interface iUpdateCourseRepository {
    updateCourse(id: string, params: iUpdateCourseParam): Promise<course>;
}

export interface iUpdateCourseParam {
    name?: string;
    description?: string;
    hours?: number;
    classes?: number;
    modules?: number;
    bannerImage?: string;
    updatedAt?: Date;
}
