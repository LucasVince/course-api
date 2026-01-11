import { ObjectId } from 'mongodb';
import { iGetModulesRepository } from '../../../controllers/course/module/get-modules/protocols';
import { mongoClient } from '../../../database/mongo';
import { module } from '../../../models/module';

export class mongoGetModulesRepository implements iGetModulesRepository {
    async getModules(course_id: string): Promise<module[]> {
        if (!course_id) {
            throw new Error('please specify an id');
        }

        const course = await mongoClient.db.collection('courses').findOne(
            { _id: new ObjectId(course_id) },
            {
                projection: {
                    modules: 1,
                    _id: 0,
                },
            },
        );

        if (!course) {
            throw new Error('course not found');
        }

        return course.modules;
    }
}
