import { deleteUserController } from '../controllers/delete-user/delete-user-controller';
import { mongoDeleteUserRepository } from '../repositories/mongo-delete-user';

export const deleteUserFactory = () => {
    const MongoDeleteUserRepository = new mongoDeleteUserRepository();
    const DeleteUserController = new deleteUserController(MongoDeleteUserRepository);

    return DeleteUserController;
};
