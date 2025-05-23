import { badRequest, ok } from '../helpers';
import { HttpRequest, iController } from '../protocols';
import { redisClient } from '../../database/redisClient';

export class LogoutController implements iController {
    async handle(
        httpRequest: HttpRequest<unknown, unknown, { authorization?: string }>,
    ): Promise<any> {
        try {
            const token = httpRequest.headers!.authorization!.split(' ')[1];

            if (!token) {
                return badRequest('Token not provided');
            }

            const blacklisted = await redisClient.get(`blacklist:${token}`);

            if (blacklisted) {
                return badRequest('Token already blacklisted');
            }

            await redisClient.set(`blacklist:${token}`, 'true', {
                EX: 60 * 60,
            });

            return ok('Logout successfully');
        } catch (err) {
            if (err instanceof Error) {
                return badRequest(err.message);
            }
            return badRequest(err);
        }
    }
}
