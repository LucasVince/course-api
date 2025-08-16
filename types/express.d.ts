import { iJwtPayload } from '../src/controllers/register-user/protocols';

declare global {
    namespace Express {
        interface Request {
            user?: iJwtPayload;
        }
    }
}
