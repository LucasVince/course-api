import { ObjectId } from 'mongodb';
import { iGetCourseByIdRepository } from '../controllers/get-course-by-id/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';

export class mongoGetCourseByIdRepository implements iGetCourseByIdRepository {
    async getCourseById(id: string): Promise<course> {
        if (!id) {
            throw new Error('please specify an id');
        }

        const course = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(id) });

        if (!course) {
            throw new Error('course not found');
        }

        const { _id, ...rest } = course;

        return {
            id: _id.toHexString(),
            ...rest,
        } as course;
    }
}
