import { getModuleByIdController } from '../../../controllers/course/module/get-module-by-id/get-module-by-id-controller';
import { mongoGetModuleByIdRepository } from '../../../repositories/course/module/mongo-get-module-by-id';

export const getModuleByIdFactory = () => {
    const MongoGetModuleByIdRepository = new mongoGetModuleByIdRepository();
    const GetModuleByIdController = new getModuleByIdController(MongoGetModuleByIdRepository);

    return GetModuleByIdController;
};
