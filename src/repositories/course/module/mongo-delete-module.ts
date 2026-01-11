import { ObjectId } from 'mongodb';
import { iDeleteModuleRepository } from '../../../controllers/course/module/delete-module/protocols';
import { mongoClient } from '../../../database/mongo';
import { module } from '../../../models/module';
import { course } from '../../../models/course';

export class mongoDeleteModuleRepository implements iDeleteModuleRepository {
    async deleteModule(course_id: string, module_id: string): Promise<module> {
        if (!course_id) {
            throw new Error('please specify an course id');
        }

        if (!module_id) {
            throw new Error('please specify an module id');
        }

        const course = await mongoClient.db.collection<{ modules: module[] }>('courses').findOne(
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

        if (!course || !course.modules || course.modules.length === 0) {
            throw new Error('module not found');
        }

        const removedModule = course.modules[0];

        const result = await mongoClient.db.collection<course>('courses').updateOne(
            { _id: new ObjectId(course_id) },
            {
                $pull: {
                    modules: { id: module_id },
                },
            },
        );

        if (result.matchedCount === 0) {
            throw new Error('course not found');
        }

        return removedModule;
    }
}
