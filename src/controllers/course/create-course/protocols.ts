import { course } from '../../../models/course';

export interface iCreateCourseRepository {
    createCourse(params: iCreateCourseParams): Promise<course>;
}

export interface iCreateCourseParams {
    courseCreator_id: string;
    name: string;
    description: string;
    hours: number;
    bannerImage: string;
    createdAt: Date;
    updatedAt: Date;
}
