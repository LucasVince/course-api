import { mongoCreateCourseRepository } from '../repositories/course/mongo-create-course';
import { createCourseController } from '../controllers/course/create-course/create-course-controller';

export const createCourseFactory = () => {
    const MongoCreateCourseRepository = new mongoCreateCourseRepository();
    const CreateCourseController = new createCourseController(MongoCreateCourseRepository);
    return CreateCourseController;
};
