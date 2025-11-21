import path from 'path';
import { course } from '../../models/course';
import { logger } from '../../utils/logger';
import { badRequest, created, serverError } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iCreateCourseParams, iCreateCourseRepository } from './protocols';
import fs from 'fs';
import sharp from 'sharp';

export class createCourseController implements iController {
    constructor(private readonly createCourseRepository: iCreateCourseRepository) {}

    async handle(
        HttpRequest: HttpRequest<iCreateCourseParams & Partial<FileRequest>>,
    ): Promise<HttpResponse<course>> {
        try {
            const body = HttpRequest?.body!;
            const file = HttpRequest.body?.file;

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

            if (!file.mimetype.startsWith('image/')) {
                fs.unlinkSync(file.path);
                badRequest('file needs to be an image');
            }

            const outputPath = path.resolve(
                file.destination,
                `bannerImageResized_${file.filename}`,
            );

            const image = sharp(file.path);
            const metadata = await image.metadata();

            if (metadata.width && metadata.width > 1000) {
                await image.resize({ width: 1000 }).toFile(outputPath);
                fs.unlinkSync(file.path);
            } else if (metadata.height && metadata.height > 1000) {
                await image.resize({ height: 1000 }).toFile(outputPath);
                fs.unlinkSync(file.path);
            }

            const bannerImageUrl = `/uploads/bannerImageResized_${file.filename}`;

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
