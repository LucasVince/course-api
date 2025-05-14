import { create } from 'domain';
import { course } from '../../models/course';
import { logger } from '../../utils/logger';
import { created, serverError } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iCreateCourseParams, iCreateCourseRepository } from './protocols';

export class createCourseController implements iController {
    constructor(private readonly createCourseRepository: iCreateCourseRepository) {}

    async handle(HttpRequest: HttpRequest<iCreateCourseParams>): Promise<HttpResponse<course>> {
        try {
            const requiredFields: Array<keyof iCreateCourseParams> = [
                'name',
                'description',
                'hours',
                'classes',
                'modules',
            ];

            const body = HttpRequest?.body!;

            if (!body) {
                logger.error('Missing body in create course controller');
                return serverError('Missing body');
            }

            for (const field of requiredFields) {
                if (!body[field]) {
                    logger.error(`Missing param: ${field}`);
                    return serverError(`Missing param: ${field}`);
                }
            }

            const { name, description, hours, classes, modules } = body;

            logger.info('name', name);
            logger.info('description', description);
            logger.info('hours', hours);
            logger.info('classes', classes);
            logger.info('modules', modules);

            const courseData = {
                name,
                description,
                hours,
                classes,
                modules,
            };

            const course = await this.createCourseRepository.createCourse(courseData);

            logger.info('Course created successfully', course);

            return created(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
