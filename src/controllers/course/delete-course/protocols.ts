import { course } from '../../models/course';

export interface iDeleteCourseRepository {
    deleteCourse(id: string): Promise<course>;
}
