import { user } from '../../models/user';
import { mongoGetUserByIdRepository } from '../../repositories/mongo-get-user-by-id';
import { serverError, ok } from '../helpers';
import { HttpRequest, HttpResponse, iController } from '../protocols';

export class getUserByIdController implements iController {
    constructor(private readonly getUserByIdRepository: mongoGetUserByIdRepository) {}
    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<user>> {
        try {
            const id = HttpRequest?.params?.id;

            const user = await  this.getUserByIdRepository.getUserById(id as string);

            return ok(user);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err)
        }
    }
}
