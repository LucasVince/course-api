import { iGetCoursesRepository } from '../controllers/get-courses/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';
import { logger } from '../utils/logger';

export class mongoGetCoursesRepository implements iGetCoursesRepository {
    async getCourses(): Promise<course[]> {
        logger.info('getCoursesRepository start');
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
