import { module } from '../../../../models/module';

export interface iUpdateModuleRepository {
    updateCourse(course_id: string, module_id: string, params: iUpdateModuleParam): Promise<module>;
}

export interface iUpdateModuleParam {
    title: string;
    description: string;
    updatedAt: Date;
}
