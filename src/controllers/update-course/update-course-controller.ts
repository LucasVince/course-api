import { course } from '../../models/course';
import { logger } from '../../utils/logger';
import { badRequest, serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iUpdateCourseRepository, iUpdateCoursesParam } from './protocols';

export class updateCourseController implements iController {
    constructor(private readonly updateCourseRepository: iUpdateCourseRepository) {}

    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<course>> {
        try {
            const id = HttpRequest?.params?.id;
            const body = HttpRequest.body!;

            if (!id) {
                logger.error('ID is required');
                return badRequest('ID is required');
            }

            const someFieldIsNotAllowed = Object.keys(HttpRequest.body!).some(
                (key) =>
                    !['name', 'description', 'hours', 'classes', 'modules'].includes(
                        key as keyof iUpdateCoursesParam,
                    ),
            );

            if (someFieldIsNotAllowed) {
                return badRequest('Some field is not allowed, or does not exist');
            }

            const course = await this.updateCourseRepository.updateCourse(id, body);

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
