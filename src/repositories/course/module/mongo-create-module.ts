import { ObjectId } from 'mongodb';
import {
    iCreateModuleParams,
    iCreateModuleRepository,
} from '../../../controllers/course/module/create-module/protocols';
import { module } from '../../../models/module';
import { mongoClient } from '../../../database/mongo';
import { course } from '../../../models/course';
import { logger } from '../../../utils/logger';

export class mongoCreateModuleRepository implements iCreateModuleRepository {
    async createModule(params: iCreateModuleParams): Promise<module> {
        const { id, course_id, description, title, createdAt, updatedAt } = params;

        const newModule: module = {
            id,
            title,
            description,
            lessons: [],
            createdAt,
            updatedAt,
        };

        const course = await mongoClient.db.collection<course>('courses').updateOne(
            { _id: new ObjectId(course_id) },
            {
                $push: {
                    modules: newModule,
                },
            },
        );

        if (course.matchedCount === 0) {
            throw new Error('course not found');
        }

        return newModule;
    }
}
