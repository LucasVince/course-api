import { ok, serverError } from '../../helpers';
import { iController } from '../../protocols';
import { HttpResponse } from '../../protocols';
import { course } from '../../../models/course';
import { iGetCoursesRepository } from './protocols';

export class getCoursesController implements iController {
    constructor(private readonly getCoursesRepository: iGetCoursesRepository) {}
    async handle(): Promise<HttpResponse<course[]>> {
        try {
            const courses = await this.getCoursesRepository.getCourses();

            return ok(courses);
        } catch (err) {
            if (err instanceof Error) {
                return serverError(err.message);
            }
            return serverError(err)
        }
    }
}
