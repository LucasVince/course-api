import { module } from '../../../../models/module';
import { badRequest, serverError, ok } from '../../../helpers';
import { HttpRequest, HttpResponse, iController } from '../../../protocols';
import { iDeleteModuleRepository } from './protocols';

export class deleteCourseController implements iController {
    constructor(private readonly deleteModuleRepository: iDeleteModuleRepository) {}

    async handle(
        HttpRequest: HttpRequest<unknown, { course_id: string; module_id: string }>,
    ): Promise<HttpResponse<module>> {
        try {
            const course_id = HttpRequest?.params?.course_id;
            const module_id = HttpRequest?.params?.module_id;

            if (!course_id) {
                return badRequest('course ID is required');
            }

            if (!module_id) {
                return badRequest('module ID is required');
            }

            const module = await this.deleteModuleRepository.deleteModule(
                course_id as string,
                module_id as string,
            );

            return ok(module);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
