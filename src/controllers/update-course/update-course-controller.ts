import path from 'path';
import fs from 'fs';
import { course } from '../../models/course';
import { badRequest, serverError, ok } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iUpdateCourseRepository, iUpdateCourseParam } from './protocols';
import sharp from 'sharp';
import { iGetCourseByIdRepository } from '../get-course-by-id/protocols';
import deleteFileFromUpdate from '../../utils/deleteFileFromUpdate';
import isAspectRatio from '../../utils/aspectRatioCalc';

export class updateCourseController implements iController {
    constructor(
        private readonly updateCourseRepository: iUpdateCourseRepository,
        private readonly getCourseByIdRepository: iGetCourseByIdRepository,
    ) {}

    async handle(
        HttpRequest: HttpRequest<iUpdateCourseParam & Partial<FileRequest>, { id: string }>,
    ): Promise<HttpResponse<course>> {
        try {
            const id = HttpRequest?.params?.id;
            const body = HttpRequest.body!;
            const file = HttpRequest.body?.file;

            if (!id) {
                return badRequest('ID is required');
            }

            const someFieldIsNotAllowed = Object.keys(HttpRequest.body!).some(
                (key) =>
                    ![
                        'name',
                        'description',
                        'hours',
                        'classes',
                        'modules',
                        'banner',
                        'file',
                    ].includes(key as keyof iUpdateCourseParam),
            );

            if (someFieldIsNotAllowed) {
                return badRequest('Some field is not allowed, or does not exist');
            }

            if (file) {
                if (!file.mimetype.startsWith('image/')) {
                    fs.unlinkSync(file.path);
                    badRequest('file needs to be an image');
                }

                const outputPath = path.resolve(
                    file.destination,
                    `bannerImageResized${file.filename}`,
                );

                const image = sharp(file.path);
                const metadata = await image.metadata();

                const isBanner = isAspectRatio(metadata.width, metadata.height, 16 / 9, 0.25);

                if (!isBanner) {
                    await image.resize({
                        width: 1920,
                        height: 1080,
                        fit: 'cover',
                        position: 'center',
                    });
                }

                if (metadata.width && metadata.width > 2000) {
                    await image.resize({ width: 1920 }).toFile(outputPath);
                    fs.unlinkSync(file.path);
                } else if (metadata.height && metadata.height > 2000) {
                    await image.resize({ height: 1080 }).toFile(outputPath);
                    fs.unlinkSync(file.path);
                } else {
                    await image.toFile(outputPath);
                    fs.unlinkSync(file.path);
                }

                body.bannerImage = `/uploads/bannerImageResized${file.filename}`;
            }

            const oldCourse = await this.getCourseByIdRepository.getCourseById(id);

            if (!oldCourse) {
                badRequest('Course not found, could not delete old profile picture');
            }

            const oldBannerImage = oldCourse.bannerImage;

            if (oldBannerImage) {
                deleteFileFromUpdate(oldBannerImage);
            }

            const { file: _, ...bodyWithoutFile } = body;

            const course = await this.updateCourseRepository.updateCourse(id, bodyWithoutFile);

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
