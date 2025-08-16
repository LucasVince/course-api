import { getUsersController } from '../controllers/get-users/get-users-controller';
import { mongoGetUsersRepository } from '../repositories/mongo-get-users';

export const getUsersFactory = () => {
    const MongoGetUsersRepository = new mongoGetUsersRepository();
    const GetUsersController = new getUsersController(MongoGetUsersRepository);

    return GetUsersController;
};
