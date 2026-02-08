import { ObjectId } from "mongodb";
import { iUpdateModuleParam, iUpdateModuleRepository } from "../../../controllers/course/module/update-module/protocols";
import { module } from "../../../models/module";
import { mongoClient } from "../../../database/mongo";

export class mongoUpdateModulesRepository implements iUpdateModuleRepository {
    async updateCourse(course_id: string, module_id: string, params: iUpdateModuleParam): Promise<module> {
        if (!course_id) {
            throw new Error('please specify an course id');
        }
        if (!module_id) {
            throw new Error('please specify an module id');
        }

        await mongoClient.db.collection('courses').updateOne(
            { _id: new ObjectId(course_id), 'modules.id': module_id },
            { $set: { 'modules.$.title': params.title, 'modules.$.description': params.description, 'modules.$.updatedAt': params.updatedAt } },
        )

        const module = await mongoClient.db
            .collection('courses')
            .findOne({ _id: new ObjectId(course_id), 'modules.id': module_id},
            { projection: { modules: 1 } }
        );

        if (!module) {
            throw new Error('Course not found');
        }

        const { _id, ...rest } = module;

        return {
            id: _id.toHexString(),
            ...rest,
        } as module;
    }
}