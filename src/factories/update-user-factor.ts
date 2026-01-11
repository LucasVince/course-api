import { updateUserController } from '../controllers/user/update-user/update-user-controller';
import { mongoGetUserByIdRepository } from '../repositories/user/mongo-get-user-by-id';
import { mongoUpdateUserRepository } from '../repositories/user/mongo-update-user';

export const updateUserFactory = () => {
    const MongoUpdateUserRepository = new mongoUpdateUserRepository();
    const MongoGetUserByIdRepository = new mongoGetUserByIdRepository();
    const UpdateUserController = new updateUserController(
        MongoUpdateUserRepository,
        MongoGetUserByIdRepository,
    );

    return UpdateUserController;
};
