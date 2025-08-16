import { ObjectId } from 'mongodb';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';
import { logger } from '../utils/logger';
import {
    iUpdateCourseRepository,
    iUpdateCoursesParam,
} from '../controllers/update-course/protocols';

export class mongoUpdateCourseRepository implements iUpdateCourseRepository {
    async updateCourse(id: string, params: iUpdateCoursesParam): Promise<course> {
        if (!id) {
            logger.error('ID is required');
            throw new Error('ID is required');
        }

        const courseToUpdate = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(id) });

        if (!courseToUpdate) {
            logger.error('Course not found');
            throw new Error('Course not found');
        }

        await mongoClient.db
            .collection('courses')
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...courseToUpdate!.params, ...params } },
            );

        const course = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(id) });

        if (!course) {
            throw new Error('Course not created');
        }

        const { _id, ...rest } = course;

        return {
            id: _id.toHexString(),
            ...rest,
        } as course;
    }
}
