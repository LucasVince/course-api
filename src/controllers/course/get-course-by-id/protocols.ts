import { course } from '../../../models/course';

export interface iGetCourseByIdRepository {
    getCourseById(id: string): Promise<course>;
}
