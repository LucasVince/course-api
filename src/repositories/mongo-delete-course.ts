import { ObjectId } from 'mongodb';
import { iDeleteCourseRepository } from '../controllers/delete-course/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';

export class mongoDeleteCourseRepository implements iDeleteCourseRepository {
    async deleteCourse(id: string): Promise<course> {
        if (!id) {
            throw new Error('ID is required');
        }

        const course = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(id) });

        if (!course) {
            throw new Error('Course not found');
        }

        await mongoClient.db.collection('courses').findOneAndDelete({ _id: new ObjectId(id) });

        const { _id, ...courseData } = course;

        return {
            id: _id.toString(),
            ...courseData,
        } as course;
    }
}
