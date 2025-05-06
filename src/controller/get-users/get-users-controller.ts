import { iGetUsersRepositoy } from './protocols';
import { HttpResponse, iController } from '../protocols';
import { user } from '../../models/user';
import { ok, serverError } from '../helpers';
import { logger } from '../../utils/logger';

export class getUsersController implements iController {
    constructor(private readonly getUsersRepository: iGetUsersRepositoy) {}
    async handle(): Promise<HttpResponse<user[]>> {
        logger.info('Get users controller called');
        try {
            const users = await this.getUsersRepository.getUsers();

            logger.info('Get users successfully', { users });
            return ok(users);
        } catch (err) {
            return serverError(err as string);
        }
    }
}
