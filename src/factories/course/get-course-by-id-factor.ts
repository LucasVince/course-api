import { getCourseByIdController } from '../../controllers/course/get-course-by-id/get-course-by-id-controller';
import { mongoGetCourseByIdRepository } from '../../repositories/course/mongo-get-course-by-id';

export const getCourseByIdFactory = () => {
    const MongoGetCourseByIdRepository = new mongoGetCourseByIdRepository();
    const GetCourseByIdController = new getCourseByIdController(MongoGetCourseByIdRepository);

    return GetCourseByIdController;
};
