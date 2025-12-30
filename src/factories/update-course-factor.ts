import { updateCourseController } from '../controllers/update-course/update-course-controller';
import { mongoGetCourseByIdRepository } from '../repositories/mongo-get-course-by-id';
import { mongoUpdateCourseRepository } from '../repositories/mongo-update-course';

export const updateCourseFactory = () => {
    const MongoUpdateCourseRepository = new mongoUpdateCourseRepository();
    const MongoGetCourseByIdRepository = new mongoGetCourseByIdRepository();
    const UpdateCourseController = new updateCourseController(
        MongoUpdateCourseRepository,
        MongoGetCourseByIdRepository,
    );

    return UpdateCourseController;
};
