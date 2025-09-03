import { course } from '../../models/course';
import { logger } from '../../utils/logger';
import { badRequest, created, serverError } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iCreateCourseParams, iCreateCourseRepository } from './protocols';

export class createCourseController implements iController {
    constructor(private readonly createCourseRepository: iCreateCourseRepository) {}

    async handle(
        HttpRequest: HttpRequest<iCreateCourseParams & Partial<FileRequest>>,
    ): Promise<HttpResponse<course>> {
        try {
            const file = HttpRequest.body?.file;
            const body = HttpRequest?.body!;

            const requiredFields: Array<keyof iCreateCourseParams> = [
                'courseCreator_id',
                'name',
                'description',
                'hours',
                'classes',
                'modules',
            ];

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

            const { courseCreator_id, name, description } = body;

            const hours = Number(body.hours);
            const classes = Number(body.classes);
            const modules = Number(body.modules);

            if (!file) {
                logger.error('Banner image is nescessary');
                return badRequest('Banner image is nescessary');
            }

            const bannerImageUrl = `/uploads/${file.filename}`;

            const courseData = {
                courseCreator_id,
                name,
                description,
                hours,
                classes,
                modules,
                bannerImage: bannerImageUrl,
            };

            const course = await this.createCourseRepository.createCourse(courseData);

            return created(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
