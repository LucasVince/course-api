import { ok, serverError } from '../../../helpers';
import { HttpRequest, iController } from '../../../protocols';
import { HttpResponse } from '../../../protocols';
import { module } from '../../../../models/module';
import { iGetModuleByIdRepository } from './protocols';

export class getModuleByIdController implements iController {
    constructor(private readonly getModuleByIdRepository: iGetModuleByIdRepository) {}
    async handle(
        HttpRequest: HttpRequest<unknown, { course_id: string; module_id: string }>,
    ): Promise<HttpResponse<module[]>> {
        try {
            const course_id = HttpRequest?.params?.course_id;
            const module_id = HttpRequest?.params?.module_id;

            const modules = await this.getModuleByIdRepository.getModuleById(
                course_id as string,
                module_id as string,
            );

            return ok(modules);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
