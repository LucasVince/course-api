import { iJwtPayload } from '../../../types/JwtPayload';
import { user } from '../../models/user';
import { mongoLoginRepository } from '../../repositories/mongo-login-repository';
import { generateToken } from '../../services/generateToken';
import { badRequest, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iLoginParams } from './protocols';

export class loginController implements iController {
    constructor(private readonly loginRepository: mongoLoginRepository) {}
    async handle(HttpRequest: HttpRequest<iLoginParams>): Promise<HttpResponse<user>> {
        try {
            const body = HttpRequest.body;

            if (!body) {
                return badRequest('Missing Body');
            }

            const userToLogin: iLoginParams = {
                id: body.id,
                email: body.email,
                password: body.password,
            };

            const user = await this.loginRepository.Login(userToLogin as user);

            const userPayload: iJwtPayload = {
                id: body.id,
            };

            const token = generateToken(userPayload);

            return ok({ user, token });
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
