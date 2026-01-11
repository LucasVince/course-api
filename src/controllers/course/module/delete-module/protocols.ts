import { module } from '../../../../models/module';

export interface iDeleteModuleRepository {
    deleteModule(course_id: string, module_id: string): Promise<module>;
}
