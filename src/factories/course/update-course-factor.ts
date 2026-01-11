import { updateCourseController } from '../../controllers/course/update-course/update-course-controller';
import { mongoGetCourseByIdRepository } from '../../repositories/course/mongo-get-course-by-id';
import { mongoUpdateCourseRepository } from '../../repositories/course/mongo-update-course';

export const updateCourseFactory = () => {
    const MongoUpdateCourseRepository = new mongoUpdateCourseRepository();
    const MongoGetCourseByIdRepository = new mongoGetCourseByIdRepository();
    const UpdateCourseController = new updateCourseController(
        MongoUpdateCourseRepository,
        MongoGetCourseByIdRepository,
    );

    return UpdateCourseController;
};
