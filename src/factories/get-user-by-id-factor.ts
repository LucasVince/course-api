import { getUserByIdController } from '../controller/get-user-by-id/get-user-by-id-controller';
import { mongoGetUserByIdRepository } from '../repositories/mongo-get-user-by-id';

export const getUserByIdFactory = () => {
    const MongoGetUserByIdRepository = new mongoGetUserByIdRepository();
    const GetUserByIdController = new getUserByIdController(MongoGetUserByIdRepository);

    return GetUserByIdController;
};
