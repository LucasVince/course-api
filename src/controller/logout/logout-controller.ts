import { badRequest, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { logger } from '../../utils/logger';
import { blacklistToken } from '../../services/blacklistToken';

export class LogoutController implements iController {
    async handle(
        httpRequest: HttpRequest<unknown, unknown, { authorization?: string }>,
    ): Promise<HttpResponse<string>> {
        try {
            logger.info('Logout controller initialized');

            const token = httpRequest.headers!.authorization!.split(' ')[1];

            logger.info('Logout controller token:');
            logger.info(token);

            if (!token) {
                logger.error('Token not provided');
                return badRequest('Token not provided');
            }

            return await blacklistToken(token);
        } catch (err) {
            if (err instanceof Error) {
                return badRequest(err.message);
            }
            return badRequest(err);
        }
    }
}
