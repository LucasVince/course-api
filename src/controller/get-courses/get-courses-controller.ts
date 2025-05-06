import { ok, serverError } from '../helpers';
import { iController } from '../protocols';
import { HttpResponse } from '../protocols';
import { course } from '../../models/course';
import { iGetCoursesRepository } from './protocols';
import { logger } from '../../utils/logger';

export class getCoursesController implements iController {
    constructor(private readonly getCoursesRepository: iGetCoursesRepository) {}
    async handle(): Promise<HttpResponse<course[]>> {
        logger.info('Get courses controller called');
        try {
            const courses = await this.getCoursesRepository.getCourses();

            logger.info('Get courses successfully', { courses });
            return ok(courses);
        } catch (err) {
            return serverError(err as string);
        }
    }
}
