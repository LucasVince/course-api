import { mongoGetModulesRepository } from '../../../repositories/course/module/mongo-get-modules';
import { getModulesController } from '../../../controllers/course/module/get-modules/get-modules-controller';

export const getModulesFactory = () => {
    const MongoGetModulesRepository = new mongoGetModulesRepository();
    const GetModulesController = new getModulesController(MongoGetModulesRepository);

    return GetModulesController;
};
