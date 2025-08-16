import { registerUserController } from '../controllers/register-user/register-user-controller';
import { mongoRegisterUserRepository } from '../repositories/mongo-register-user';

export const registerUserFactory = () => {
    const MongoRegisterUserRepository = new mongoRegisterUserRepository();
    const RegisterUserController = new registerUserController(MongoRegisterUserRepository);

    return RegisterUserController;
};
