import { mongoCreateCourseRepository } from '../repositories/mongo-create-course';
import { createCourseController } from '../controllers/create-course/create-course-controller';

export const createCourseFactory = () => {
    const MongoCreateCourseRepository = new mongoCreateCourseRepository();
    const CreateCourseController = new createCourseController(MongoCreateCourseRepository);
    return CreateCourseController;
};
