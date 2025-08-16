import { deleteCourseController } from '../controllers/delete-course/delete-course-controller';
import { mongoDeleteCourseRepository } from '../repositories/mongo-delete-course';

export const deleteCourseFactory = () => {
    const MongoDeleteCourseRepository = new mongoDeleteCourseRepository();
    const DeleteCourseController = new deleteCourseController(MongoDeleteCourseRepository);

    return DeleteCourseController;
};
