import path from 'path';
import fs from 'fs';
import { user } from '../../models/user';
import { logger } from '../../utils/logger';
import { badRequest, serverError, ok } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iUpdateUserRepository, iUpdateUserParam } from './protocols';
import sharp from 'sharp';

export class updateUserController implements iController {
    constructor(private readonly updateUserRepository: iUpdateUserRepository) {}

    async handle(
        HttpRequest: HttpRequest<iUpdateUserParam & Partial<FileRequest>, { id: string }>,
    ): Promise<HttpResponse<user>> {
        try {
            const id = HttpRequest?.params?.id;
            const body = HttpRequest.body!;
            const file = HttpRequest.body?.file;

            if (!id) {
                logger.error('ID is required');
                return badRequest('ID is required');
            }

            const someFieldIsNotAllowed = Object.keys(HttpRequest.body!).some(
                (key) =>
                    ![
                        'name',
                        'email',
                        'role',
                        'completedCourses',
                        'certificates',
                        'password',
                        'profilePicture',
                    ].includes(key as keyof iUpdateUserParam),
            );

            if (someFieldIsNotAllowed) {
                return badRequest('Some field is not allowed, or does not exist');
            }

            const { name, email, role, completedCourses, certificates, password } = body;

            if (file) {
                if (!file.mimetype.startsWith('image/')) {
                    fs.unlinkSync(file.path);
                    badRequest('file needs to be an image');
                }

                const outputPath = path.resolve(
                    file.destination,
                    `${file.filename}profilePictureResized`,
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

                body.profilePicture = `/uploads/profilePictureResized${file.filename}`;
            }

            const user = await this.updateUserRepository.updateUser(id, body);

            return ok(user);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
