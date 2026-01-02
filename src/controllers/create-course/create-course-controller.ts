import path from 'path';
import { course } from '../../models/course';
import { badRequest, created, serverError } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iCreateCourseParams, iCreateCourseRepository } from './protocols';
import fs from 'fs';
import sharp from 'sharp';
import isAspectRatio from '../../utils/aspectRatioCalc';

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
                return serverError('Missing body');
            }

            for (const field of requiredFields) {
                if (!body[field]) {
                    return serverError(`Missing param: ${field}`);
                }
            }

            const { courseCreator_id, name, description } = body;

            const hours = Number(body.hours);
            const classes = Number(body.classes);
            const modules = Number(body.modules);

            if (!file) {
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

            const isBanner = isAspectRatio(metadata.width, metadata.height, 16 / 9, 0.02);

            if (!isBanner) {
                await image.resize({
                    width: 1920,
                    height: 1080,
                    fit: 'cover',
                    position: 'center',
                });
            } else {
                await image
                    .resize({
                        width: 1920,
                        height: 1080,
                        fit: 'inside',
                        position: 'center',
                    })
                    .toFile(outputPath);
            }

            fs.unlinkSync(file.path);

            const courseData = {
                courseCreator_id,
                name,
                description,
                hours,
                classes,
                modules,
                bannerImage: `/uploads/photos/bannerImageResized${file.filename}`,
                createdAt: new Date(),
                updatedAt: new Date(),
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
