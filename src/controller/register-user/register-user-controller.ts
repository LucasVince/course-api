import { user } from '../../models/user';
import { badRequest, created, serverError } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iRegisterUserParams, iRegisterUserRepositoy } from './protocols';
import { isEmail } from 'validator';
import { hash } from 'bcrypt';

export class registerUserController implements iController {
    constructor(private readonly registerUserRepository: iRegisterUserRepositoy) {}
    async handle(HttpRequest: HttpRequest<iRegisterUserParams>): Promise<HttpResponse<user>> {
        try {
            const requiredFields: Array<keyof iRegisterUserParams> = [
                'name',
                'email',
                'password',
                'role',
            ];

            const body = HttpRequest?.body!;

            if (!body) {
                return badRequest('Missing body');
            }

            for (const field of requiredFields) {
                if (!body[field]) {
                    return badRequest(`Missing param: ${field}`);
                }
            }

            const { name, email, password, role } = HttpRequest!.body!;

            const isEmailValid = isEmail(email);

            if (!isEmailValid) {
                return badRequest('Invalid email format');
            }

            const hashedPassword = await hash(password, 10);

            const userToCreate: iRegisterUserParams = {
                name: name,
                email: email,
                password: hashedPassword,
                role: role,
            };

            const user = await this.registerUserRepository.registerUser(userToCreate as user);

            return created(user);
        } catch (error) {
            return serverError(error as string);
        }
    }
}
