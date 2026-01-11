import { badRequest, ok } from '../../helpers';
import { HttpRequest, HttpResponse, iController } from '../../protocols';
import { blacklistToken } from '../../../services/blackListToken';

export class LogoutController implements iController {
    async handle(
        httpRequest: HttpRequest<unknown, unknown, { authorization?: string }>,
    ): Promise<HttpResponse<string>> {
        try {
            const token = httpRequest.headers!.authorization!.split(' ')[1];

            if (!token) {
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
