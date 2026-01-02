import { Router } from 'express';
import { getCourseByIdFactory } from '../factories/get-course-by-id-factor';
import { authToken } from '../middleware/authToken';
import { getCoursesFactory } from '../factories/get-courses-factor';
import { createCourseFactory } from '../factories/create-course-factor';
import { deleteCourseFactory } from '../factories/delete-course-factor';
import { updateCourseFactory } from '../factories/update-course-factor';
import { photoUpload } from '../middleware/photoUploadMiddleware';

const router = Router();

router.get('/get', async (_req, res) => {
    const GetCourses = getCoursesFactory();

    const response = await GetCourses.handle();

    res.status(response.statusCode).json(response.body);
});

router.get('/get/:id', async (req, res) => {
    const GetCourseById = getCourseByIdFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'GET',
    };

    const response = await GetCourseById.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.post('/post', photoUpload.single('banner'), async (req, res) => {
    const createCourse = createCourseFactory();

    const HttpRequest = {
        body: { ...req.body, file: req.file },
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as 'POST',
    };

    const response = await createCourse.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.patch('/update/:id', photoUpload.single('banner'), async (req, res) => {
    const updateCourse = updateCourseFactory();

    const HttpRequest = {
        body: { ...req.body, file: req.file },
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'PATCH',
    };

    const response = await updateCourse.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.delete('/delete/:id', async (req, res) => {
    const DeleteUser = deleteCourseFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'DELETE',
    };

    const response = await DeleteUser.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

export default router;
