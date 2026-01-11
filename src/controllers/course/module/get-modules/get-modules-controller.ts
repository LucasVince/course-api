import { ok, serverError } from '../../../helpers';
import { HttpRequest, iController } from '../../../protocols';
import { HttpResponse } from '../../../protocols';
import { module } from '../../../../models/module';
import { iGetModulesRepository } from './protocols';

export class getModulesController implements iController {
    constructor(private readonly getModulesRepository: iGetModulesRepository) {}
    async handle(
        HttpRequest: HttpRequest<unknown, { course_id: string }>,
    ): Promise<HttpResponse<module[]>> {
        try {
            const course_id = HttpRequest?.params?.course_id;

            const modules = await this.getModulesRepository.getModules(course_id as string);

            return ok(modules);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
