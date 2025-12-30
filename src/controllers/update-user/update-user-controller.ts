import fs from 'fs';
import path from 'path';
import { user } from '../../models/user';
import { badRequest, serverError, ok } from '../helpers';
import { FileRequest, HttpRequest, HttpResponse, iController } from '../protocols';
import { iUpdateUserRepository, iUpdateUserParam } from './protocols';
import { iGetUserByIdRepository } from '../get-user-by-id/protocols';
import deleteFileFromUpdate from '../../utils/deleteFileFromUpdate';
import sharp from 'sharp';

export class updateUserController implements iController {
    constructor(
        private readonly updateUserRepository: iUpdateUserRepository,
        private readonly getUserByIdRepository: iGetUserByIdRepository,
    ) {}

    async handle(
        HttpRequest: HttpRequest<iUpdateUserParam & Partial<FileRequest>, { id: string }>,
    ): Promise<HttpResponse<user>> {
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
                        'email',
                        'role',
                        'completedCourses',
                        'certificates',
                        'password',
                        'profilePicture',
                        'file',
                    ].includes(key as keyof iUpdateUserParam),
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
                    `profilePictureResized${file.filename}`,
                );

                const image = sharp(file.path);
                const metadata = await image.metadata();

                if (metadata.width && metadata.width > 1000) {
                    await image.resize({ width: 1000 }).toFile(outputPath);
                    fs.unlinkSync(file.path);
                } else if (metadata.height && metadata.height > 1000) {
                    await image.resize({ height: 1000 }).toFile(outputPath);
                    fs.unlinkSync(file.path);
                } else {
                    await image.toFile(outputPath);
                    fs.unlinkSync(file.path);
                }

                body.profilePicture = `/uploads/profilePictureResized${file.filename}`;
            }

            const oldUser = await this.getUserByIdRepository.getUserById(id);

            if (!oldUser) {
                return badRequest('User not found, could not delete old profile picture');
            }

            const oldProfilePicture = oldUser.profilePicture;

            if (oldProfilePicture != 'none') {
                deleteFileFromUpdate(oldProfilePicture);
            }

            const { file: _, ...bodyWithoutFile } = body;

            const user = await this.updateUserRepository.updateUser(id, bodyWithoutFile);

            return ok(user);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
