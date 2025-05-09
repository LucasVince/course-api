import { ObjectId } from 'mongodb';
import { iGetCourseByIdRepository } from '../controller/get-course-by-id/protocols';
import { mongoClient } from '../database/mongo';
import { logger } from '../utils/logger';
import { course } from '../models/course';

export class mongoGetCourseByIdRepository implements iGetCourseByIdRepository {
    async getCourseById(id: string): Promise<course> {
        logger.info('getCourseByIdRepository start');
        
        if (!id) {
            logger.error('please specify an id');
            throw new Error('please specify an id');
        }

        const course = await mongoClient.db.collection('courses').findOne({ _id: new ObjectId(id) });

        if (!course) {
            logger.error('getCourseByIdRepository error: course not found');
            throw new Error('course not found');
        }

        const { _id, ...rest } = course;

        return {
            id: _id.toHexString(),
            ...rest,
        } as course;
    }
}
