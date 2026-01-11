import { loginController } from '../controllers/user/login/login';
import { mongoLoginRepository } from '../repositories/user/mongo-login-repository';

export const loginFactory = () => {
    const MongoLoginRepository = new mongoLoginRepository();
    const LoginController = new loginController(MongoLoginRepository);

    return LoginController;
};
