import { user } from '../../models/user';
import { badRequest, created, serverError } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iRegisterUserParams, iRegisterUserRepositoy } from './protocols';
import { iJwtPayload } from '../../../types/JwtPayload';
import { isEmail } from 'validator';
import { hash } from 'bcrypt';
import { generateToken } from '../../services/generateToken';

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

            const { name, email, password, role } = body;

            const isEmailValid = isEmail(email);

            if (!isEmailValid) {
                return badRequest('Invalid email format');
            }

            const validRoles = ['teacher', 'student'];

            if (!validRoles.includes(HttpRequest?.body!.role.toLowerCase())) {
                return badRequest('Invalid role. Role must be either "teacher" or "student"');
            }

            const hashedPassword = await hash(password, 10);

            const roleToLowerCase = role.toLowerCase() as 'teacher' | 'student';

            const userToCreate: iRegisterUserParams = {
                name: name,
                password: hashedPassword,
                email: email,
                role: roleToLowerCase,
                profilePicture: 'none',
            };

            const user = await this.registerUserRepository.registerUser(userToCreate as user);

            const userPayload: iJwtPayload = {
                id: user.id,
            };

            const token = generateToken(userPayload);

            return created({ user: user, token: token });
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
