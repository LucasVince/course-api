import { deleteCourseController } from '../../controllers/course/delete-course/delete-course-controller';
import { mongoDeleteCourseRepository } from '../../repositories/course/mongo-delete-course';

export const deleteCourseFactory = () => {
    const MongoDeleteCourseRepository = new mongoDeleteCourseRepository();
    const DeleteCourseController = new deleteCourseController(MongoDeleteCourseRepository);

    return DeleteCourseController;
};
