import { registerUserController } from '../../controllers/user/register-user/register-user-controller';
import { mongoRegisterUserRepository } from '../../repositories/user/mongo-register-user';

export const registerUserFactory = () => {
    const MongoRegisterUserRepository = new mongoRegisterUserRepository();
    const RegisterUserController = new registerUserController(MongoRegisterUserRepository);

    return RegisterUserController;
};
