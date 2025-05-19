import { course } from '../../models/course';
import { logger } from '../../utils/logger';
import { badRequest, serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iDeleteCourseRepository } from './protocols';

export class deleteCourseController implements iController {
    constructor(private readonly deleteCourseRepository: iDeleteCourseRepository) {}

    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<course>> {
        try {
            const id = HttpRequest?.params?.id;

            if (!id) {
                logger.error('ID is required');
                return badRequest('ID is required');
            }

            const course = await this.deleteCourseRepository.createCourse(id);

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
