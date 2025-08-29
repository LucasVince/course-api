import { updateUserController } from '../controllers/update-user/update-user-controller';
import { mongoUpdateUserRepository } from '../repositories/mongo-update-user';

export const updateUserFactory = () => {
    const MongoUpdateUserRepository = new mongoUpdateUserRepository();
    const UpdateUserController = new updateUserController(MongoUpdateUserRepository);

    return UpdateUserController;
};
