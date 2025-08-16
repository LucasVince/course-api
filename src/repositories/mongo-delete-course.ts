import { ObjectId } from 'mongodb';
import { iDeleteCourseRepository } from '../controllers/delete-course/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';
import { logger } from '../utils/logger';

export class mongoDeleteCourseRepository implements iDeleteCourseRepository {
    async deleteCourse(id: string): Promise<course> {
        if (!id) {
            logger.error('ID is required');
            throw new Error('ID is required');
        }

        const course = await mongoClient.db
            .collection('courses')
            .findOneAndDelete({ _id: new ObjectId(id) });

        if (!course) {
            logger.error('Course not found');
            throw new Error('Course not found');
        }

        const { _id, ...courseData } = course;

        return {
            id: _id.toString(),
            ...courseData,
        } as course;
    }
}
