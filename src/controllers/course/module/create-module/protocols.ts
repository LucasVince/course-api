import { module } from '../../../../models/module';

export interface iCreateModuleRepository {
    createModule(params: iCreateModuleParams): Promise<module>;
}

export interface iCreateModuleParams {
    id: string;
    course_id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
