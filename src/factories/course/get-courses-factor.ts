import { getCoursesController } from '../../controllers/course/get-courses/get-courses-controller';
import { mongoGetCoursesRepository } from '../../repositories/course/mongo-get-courses';

export const getCoursesFactory = () => {
    const MongoGetCoursesRepository = new mongoGetCoursesRepository();
    const GetCoursesController = new getCoursesController(MongoGetCoursesRepository);

    return GetCoursesController;
};
