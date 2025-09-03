import { ObjectId } from 'mongodb';
import {
    iCreateCourseParams,
    iCreateCourseRepository,
} from '../controllers/create-course/protocols';
import { mongoClient } from '../database/mongo';
import { course } from '../models/course';
import { logger } from '../utils/logger';

export class mongoCreateCourseRepository implements iCreateCourseRepository {
    async createCourse(params: iCreateCourseParams): Promise<course> {
        logger.info('createCourseRepository start');
        const { courseCreator_id, name, description, hours, classes, modules, bannerImage } =
            params;

        const courseCreator = await mongoClient.db
            .collection('users')
            .findOne({ _id: new ObjectId(courseCreator_id) });

        if (!courseCreator) {
            logger.error('courseCreator invalid');
            throw new Error('courseCreator invalid');
        }

        if (courseCreator.role != 'teacher') {
            logger.error('You need to be a teacher to create a course');
            throw new Error('You need to be a teacher to create a course');
        }

        const newCourse = await mongoClient.db.collection('courses').insertOne({
            courseCreator_id,
            name,
            description,
            hours,
            classes,
            modules,
            bannerImage,
        });

        logger.info('Course created successfully');

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
