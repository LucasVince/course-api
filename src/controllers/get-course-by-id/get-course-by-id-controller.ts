import { course } from '../../models/course';
import { mongoGetCourseByIdRepository } from '../../repositories/mongo-get-course-by-id';
import { logger } from '../../utils/logger';
import { serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';

export class getCourseByIdController implements iController {
    constructor(private readonly getCourseByIdRepository: mongoGetCourseByIdRepository) {}
    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<course>> {
        logger.info('Get course by id controller called');''
        try {
            const id = HttpRequest?.params?.id;

            logger.info('id:', id);

            const course = await  this.getCourseByIdRepository.getCourseById(id as string);

            logger.info('course:', course);

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err)
        }
    }
}
