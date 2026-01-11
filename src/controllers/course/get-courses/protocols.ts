import { course } from "../../../models/course";

export interface iGetCoursesRepository {
    getCourses(): Promise<course[]>;
}