import { updateCourseController } from '../controllers/update-course/update-course-controller';
import { mongoUpdateCourseRepository } from '../repositories/mongo-update-course';

export const updateCourseFactory = () => {
    const MongoUpdateCourseRepository = new mongoUpdateCourseRepository();
    const UpdateCourseController = new updateCourseController(MongoUpdateCourseRepository);

    return UpdateCourseController;
};
