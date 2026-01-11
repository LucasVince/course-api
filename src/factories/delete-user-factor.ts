import { deleteUserController } from '../controllers/user/delete-user/delete-user-controller';
import { mongoDeleteUserRepository } from '../repositories/user/mongo-delete-user';

export const deleteUserFactory = () => {
    const MongoDeleteUserRepository = new mongoDeleteUserRepository();
    const DeleteUserController = new deleteUserController(MongoDeleteUserRepository);

    return DeleteUserController;
};
