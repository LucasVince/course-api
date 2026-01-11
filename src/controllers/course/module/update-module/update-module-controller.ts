import { module } from '../../../../models/module';
import { badRequest, serverError, ok } from '../../../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../../../protocols';
import { iUpdateModuleRepository, iUpdateModuleParam } from './protocols';

export class updateModuleController implements iController {
    constructor(private readonly updateModuleRepository: iUpdateModuleRepository) {}

    async handle(
        HttpRequest: HttpRequest<iUpdateModuleParam, { course_id: string; module_id: string }>,
    ): Promise<HttpResponse<module>> {
        try {
            const body = HttpRequest.body!;
            const course_id = HttpRequest?.params?.course_id;
            const module_id = HttpRequest?.params?.module_id;

            if (!course_id) {
                return badRequest('course ID is required');
            }

            if (!module_id) {
                return badRequest('module ID is required');
            }

            const someFieldIsNotAllowed = Object.keys(HttpRequest.body!).some(
                (key) => !['title', 'description'].includes(key as keyof iUpdateModuleParam),
            );

            if (someFieldIsNotAllowed) {
                return badRequest('Some field is not allowed, or does not exist');
            }

            const module = await this.updateModuleRepository.updateCourse(
                course_id,
                module_id,
                body,
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
