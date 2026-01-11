import { randomUUID } from 'crypto';
import { badRequest, created, serverError } from '../../../helpers';
import { HttpRequest, HttpResponse, iController } from '../../../protocols';
import { iCreateModuleParams, iCreateModuleRepository } from './protocols';
import { module } from '../../../../models/module';
import { logger } from '../../../../utils/logger';

export class createModuleController implements iController {
    constructor(private readonly createModuleRepository: iCreateModuleRepository) {}

    async handle(HttpRequest: HttpRequest<iCreateModuleParams>): Promise<HttpResponse<module>> {
        try {
            const body = HttpRequest?.body!;

            const requiredFields: Array<keyof iCreateModuleParams> = [
                'course_id',
                'title',
                'description',
            ];

            if (!body) {
                return serverError('Missing body');
            }

            for (const field of requiredFields) {
                if (!body[field]) {
                    return serverError(`Missing param: ${field}`);
                }
            }

            const { course_id, title, description } = body;

            const moduleData = {
                id: randomUUID(),
                course_id,
                title,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const module = await this.createModuleRepository.createModule(moduleData);

            return created(module);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
