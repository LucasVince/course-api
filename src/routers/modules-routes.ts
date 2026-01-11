import { Router } from 'express';
import { authToken } from '../middleware/authToken';
import { getModulesFactory } from '../factories/course/module/get-modules-factor';
import { getModuleByIdFactory } from '../factories/course/module/get-module-by-id-factor';
import { createModuleFactory } from '../factories/course/module/create-course-factor';
import { deleteModuleFactory } from '../factories/course/module/delete-course-factor';
import { logger } from '../utils/logger';

const router = Router();

router.get('/get/:course_id', async (req, res) => {
    const GetModules = getModulesFactory();

    const httpRequest = {
        body: req.body,
        params: req.params as { course_id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'GET',
    };

    const response = await GetModules.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
});

router.get('/get/:course_id/:module_id', async (req, res) => {
    const GetModules = getModuleByIdFactory();

    const httpRequest = {
        body: req.body,
        params: req.params as { course_id: string; module_id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'GET',
    };

    const response = await GetModules.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
});

router.post('/post', async (req, res) => {
    const createModule = createModuleFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as 'POST',
    };

    const response = await createModule.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.delete('/delete/:course_id/:module_id', async (req, res) => {
    const deleteUser = deleteModuleFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params as { course_id: string; module_id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'DELETE',
    };

    const response = await deleteUser.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

export default router;
