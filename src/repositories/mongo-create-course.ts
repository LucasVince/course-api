import {
    iCreateCourseParams,
    iCreateCourseRepository,
} from '../controller/create-course/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';
import { logger } from '../utils/logger';

export class mongoCreateCourseRepository implements iCreateCourseRepository {
    async createCourse(params: iCreateCourseParams): Promise<course> {
        logger.info('createCourseRepository start');
        const { name, description, hours, classes, modules } = params;

        const newCourse = await mongoClient.db.collection('courses').insertOne({
            name,
            description,
            hours,
            classes,
            modules,
        });
        logger.info('Course created successfully:', { newCourse });

        const course = await mongoClient.db.collection<Omit<course, 'id'>>('courses').findOne({
            _id: newCourse.insertedId,
        });

        if (!course) {
            logger.error('Course was not created');
            throw new Error('Course not created');
        }

        const { _id, ...rest } = course;

        return {
            id: _id.toHexString(),
            ...rest,
        };
    }
}
