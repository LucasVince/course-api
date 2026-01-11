import { ObjectId } from 'mongodb';
import { mongoClient } from '../../../database/mongo';
import { module } from '../../../models/module';
import { iGetModuleByIdRepository } from '../../../controllers/course/module/get-module-by-id/protocols';

export class mongoGetModuleByIdRepository implements iGetModuleByIdRepository {
    async getModuleById(course_id: string, module_id: string): Promise<module[]> {
        if (!course_id) {
            throw new Error('please specify an course id');
        }

        if (!module_id) {
            throw new Error('please specify an module id');
        }

        const course = await mongoClient.db.collection('courses').findOne(
            { _id: new ObjectId(course_id), 'modules.id': module_id },
            {
                projection: {
                    modules: {
                        $elemMatch: { id: module_id },
                    },
                    _id: 0,
                },
            },
        );

        if (!course) {
            throw new Error('course not found');
        }

        return course.modules[0];
    }
}
