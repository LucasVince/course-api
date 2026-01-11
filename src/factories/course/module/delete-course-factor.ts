import { mongoDeleteModuleRepository } from '../../../repositories/course/module/mongo-delete-module';
import { deleteModuleController } from '../../../controllers/course/module/delete-module/delete-module-controller';

export const deleteModuleFactory = () => {
    const MongoDeleteModuleRepository = new mongoDeleteModuleRepository();
    const DeleteModuleController = new deleteModuleController(MongoDeleteModuleRepository);
    return DeleteModuleController;
};
