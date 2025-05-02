import { iGetCoursesRepository } from '../controller/get-courses/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';

export class mongoGetCoursesRepository implements iGetCoursesRepository {
    async getCourses(): Promise<course[]> {
        const courses =
            (await mongoClient.db.collection<Omit<course, 'id'>>('courses').find({}).toArray()) ||
            [];

        return courses.map((course) => {
            return {
                id: course._id.toHexString(),
                ...course,
            };
        });
    }
}
