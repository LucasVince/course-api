import { Router } from 'express';
import { LogoutController } from '../controllers/user/logout/logout-controller';
import { loginFactory } from '../factories/login-facotr';
import { registerUserFactory } from '../factories/register-user-factor';
import { authToken } from '../middleware/authToken';

const router = Router();

router.post('/register', async (req, res) => {
    const RegisterUser = registerUserFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as 'POST',
    };

    const response = await RegisterUser.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.post('/login', async (req, res) => {
    const Login = loginFactory();

    const HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as 'POST',
    };

    const response = await Login.handle(HttpRequest);

    res.status(response.statusCode).json(response.body);
});

router.post('/logout', async (req, res) => {
    const logout = new LogoutController();

    const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        query: req.query,
        method: req.method as 'POST',
    };

    const response = await logout.handle(httpRequest);

    res.status(response.statusCode).json(response.body);
});

export default router;
