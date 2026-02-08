import { getUsersController } from '../../controllers/user/get-users/get-users-controller';
import { mongoGetUsersRepository } from '../../repositories/user/mongo-get-users';

export const getUsersFactory = () => {
    const MongoGetUsersRepository = new mongoGetUsersRepository();
    const GetUsersController = new getUsersController(MongoGetUsersRepository);

    return GetUsersController;
};
