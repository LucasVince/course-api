import { course } from '../../../models/course';
import { mongoGetCourseByIdRepository } from '../../../repositories/course/mongo-get-course-by-id';
import { serverError, ok } from '../../helpers';
import { HttpRequest, HttpResponse, iController } from '../../protocols';

export class getCourseByIdController implements iController {
    constructor(private readonly getCourseByIdRepository: mongoGetCourseByIdRepository) {}
    async handle(HttpRequest: HttpRequest<unknown, { id: string }>): Promise<HttpResponse<course>> {
        try {
            const id = HttpRequest?.params?.id;

            const course = await  this.getCourseByIdRepository.getCourseById(id as string);

            return ok(course);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err)
        }
    }
}
