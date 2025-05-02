import { getCoursesController } from '../controller/get-courses/get-courses-controller';
import { mongoGetCoursesRepository } from '../repositories/mongo-get-courses';

export const getCoursesFactory = () => {
    const MongoGetCoursesRepository = new mongoGetCoursesRepository();
    const GetCoursesController = new getCoursesController(MongoGetCoursesRepository);

    return GetCoursesController;
};
