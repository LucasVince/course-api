import { mongoCreateModuleRepository } from '../../../repositories/course/module/mongo-create-module';
import { createModuleController } from '../../../controllers/course/module/create-module/create-module-controller';

export const createModuleFactory = () => {
    const MongoCreateModuleRepository = new mongoCreateModuleRepository();
    const CreateModuleController = new createModuleController(MongoCreateModuleRepository);
    return CreateModuleController;
};
