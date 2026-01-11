import { module } from '../../../../models/module';

export interface iGetModuleByIdRepository {
    getModuleById(course_id: string, module_id: string): Promise<module[]>;
}
