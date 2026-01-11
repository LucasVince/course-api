import { ObjectId } from 'mongodb';
import { mongoClient } from '../../database/mongo';
import { course } from '../../models/course';
import {
    iUpdateCourseRepository,
    iUpdateCourseParam,
} from '../../controllers/course/update-course/protocols';

export class mongoUpdateCourseRepository implements iUpdateCourseRepository {
    async updateCourse(id: string, params: iUpdateCourseParam): Promise<course> {
        if (!id) {
            throw new Error('ID is required');
        }

        const courseToUpdate = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(id) });

        if (!courseToUpdate) {
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
