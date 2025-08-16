import { user } from '../../models/user';
import { mongoGetUserByIdRepository } from '../../repositories/mongo-get-user-by-id';
import { logger } from '../../utils/logger';
import { serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';

export class getUserByIdController implements iController {
    constructor(private readonly getUserByIdRepository: mongoGetUserByIdRepository) {}
    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<user>> {
        logger.info('Get user by id controller called');''
        try {
            const id = HttpRequest?.params?.id;

            logger.info('id:', id);

            const user = await  this.getUserByIdRepository.getUserById(id as string);

            logger.info('user:', user);

            return ok(user);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err)
        }
    }
}
