import { module } from "../../../../models/module";

export interface iGetModulesRepository {
    getModules(course_id: string): Promise<module[]>;
}
