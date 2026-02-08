import { mongoUpdateModuleRepository } from '../../../repositories/course/module/mongo-update-module';
import { updateModuleController } from '../../../controllers/course/module/update-module/update-module-controller';

export const updateModuleFactory = () => {
    const MongoUpdateModuleRepository = new mongoUpdateModuleRepository();
    const UpdateModuleController = new updateModuleController(MongoUpdateModuleRepository);

    return UpdateModuleController;
};
