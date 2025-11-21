import { Router } from 'express';
import { authToken } from '../middleware/authToken';
import { getUsersFactory } from '../factories/get-users-factor';
import { getUserByIdFactory } from '../factories/get-user-by-id-factor';
import { deleteUserFactory } from '../factories/delete-user-factor';
import { updateUserFactory } from '../factories/update-user-factor';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.get('/get', async (_req, res) => {
    const GetUsers = getUsersFactory();

    const response = await GetUsers.handle();

    res.status(response.statusCode).json(response.body);
});

router.get('/get/:id', async (req, res) => {
    const GetUserById = getUserByIdFactory();

    const httpRequest = {
        body: req.body,
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'GET',
    };

    const response = await GetUserById.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
});

router.patch('/update/:id', upload.single('profilePicture'), async (req, res) => {
    const UpdateUser = updateUserFactory();

    const httpRequest = {
        body: req.body,
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'GET',
    };

    const response = await UpdateUser.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
});

router.delete('/delete/:id', async (req, res) => {
    const deleteUser = deleteUserFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params as { id: string },
        headers: req.headers,
        query: req.query,
        method: req.method as 'DELETE',
    };

    const response = await deleteUser.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

export default router;
