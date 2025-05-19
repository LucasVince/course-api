import { course } from '../../models/course';

export interface iDeleteCourseRepository {
    createCourse(id: string): Promise<course>;
}
