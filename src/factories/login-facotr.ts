import { loginController } from '../controllers/login/login';
import { mongoLoginRepository } from '../repositories/mongo-login-repository';

export const loginFactory = () => {
    const MongoLoginRepository = new mongoLoginRepository();
    const LoginController = new loginController(MongoLoginRepository);

    return LoginController;
};
