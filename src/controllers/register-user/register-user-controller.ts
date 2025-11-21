import { user } from '../../models/user';
import { badRequest, created, serverError } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';
import { iRegisterUserParams, iRegisterUserRepositoy } from './protocols';
import { iJwtPayload } from '../../../types/JwtPayload';
import { isEmail } from 'validator';
import { hash } from 'bcrypt';
import { generateToken } from '../../services/generateToken';
import { logger } from '../../utils/logger';

export class registerUserController implements iController {
    constructor(private readonly registerUserRepository: iRegisterUserRepositoy) {}
    async handle(HttpRequest: HttpRequest<iRegisterUserParams>): Promise<HttpResponse<user>> {
        logger.info('Register user controller initialized');
        try {
            const requiredFields: Array<keyof iRegisterUserParams> = [
                'name',
                'email',
                'password',
                'role',
            ];

            const body = HttpRequest?.body!;

            logger.info('Register user controller body:', body);

            if (!body) {
                logger.error('Missing body in register user controller');
                return badRequest('Missing body');
            }

            for (const field of requiredFields) {
                if (!body[field]) {
                    logger.error(`Missing param: ${field}`);
                    return badRequest(`Missing param: ${field}`);
                }
            }

            const { name, email, password, role } = body;

            logger.info('name', name);
            logger.info('email', email);
            logger.info('password', password);
            logger.info('role', role);

            const isEmailValid = isEmail(email);

            if (!isEmailValid) {
                logger.error('Invalid email format', { email });
                return badRequest('Invalid email format');
            }

            const validRoles = ['teacher', 'student'];

            if (!validRoles.includes(HttpRequest?.body!.role.toLowerCase())) {
                logger.error('Invalid role. Role must be either "teacher" or "student"');
                return badRequest('Invalid role. Role must be either "teacher" or "student"');
            }

            const hashedPassword = await hash(password, 10);

            logger.info('Hashed password', hashedPassword);

            const roleToLowerCase = role.toLowerCase() as 'teacher' | 'student';
            logger.info('Role to lower case', roleToLowerCase);

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

            logger.info('User created', user);
            logger.info('Token generated', token);

            return created({ user: user, token: token });
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err);
        }
    }
}
