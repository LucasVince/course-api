import fs from 'fs';
import path from 'path';
import { user } from '../../models/user';
import { blacklistToken } from '../../services/blackListToken';
import { badRequest, serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iDeleteUserRepository } from './protocols';

export class deleteUserController implements iController {
    constructor(private readonly deleteUserRepository: iDeleteUserRepository) {}
    async handle(
        HttpRequest: HttpRequest<unknown, { id: string }, { authorization?: string }>,
    ): Promise<HttpResponse<user>> {
        try {
            const id = HttpRequest?.params?.id;
            const token = HttpRequest?.headers?.authorization?.split(' ')[1];

            if (!id) {
                return badRequest('ID is required');
            }

            if (!token) {
                return badRequest('Token not provided');
            }

            blacklistToken(token);

            const user = await this.deleteUserRepository.deleteUser(id);

            const profilePicture = user.profilePicture;

            if (fs.existsSync(profilePicture)) {
                const filePath = path.join(process.cwd(), profilePicture.replace('/^\//', ''));

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }

            return ok(user);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
