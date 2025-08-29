import { user } from '../../models/user';
import { logger } from '../../utils/logger';
import { badRequest, serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iUpdateUserRepository, iUpdateUserParam } from './protocols';

export class updateUserController implements iController {
    constructor(private readonly updateUserRepository: iUpdateUserRepository) {}

    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<user>> {
        try {
            const id = HttpRequest?.params?.id;
            const body = HttpRequest.body!;

            if (!id) {
                logger.error('ID is required');
                return badRequest('ID is required');
            }

            const someFieldIsNotAllowed = Object.keys(HttpRequest.body!).some(
                (key) =>
                    !['name', 'email', 'role', 'completedCourses', 'certificates', 'password'].includes(
                        key as keyof iUpdateUserParam,
                    ),
            );

            if (someFieldIsNotAllowed) {
                return badRequest('Some field is not allowed, or does not exist');
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
