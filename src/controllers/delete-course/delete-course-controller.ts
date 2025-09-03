import path from 'path';
import fs from 'fs';
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

            const course = await this.deleteCourseRepository.deleteCourse(id);

            const bannerImage = course.bannerImage;

            if (bannerImage) {
                const filePath = path.join(process.cwd(), bannerImage.replace('/^\//', ''));

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    logger.info('file deleted successfully');
                }
            }

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
