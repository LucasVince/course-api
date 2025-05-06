import { iJwtPayload } from '../src/controller/register-user/protocols';

declare global {
    namespace Express {
        interface Request {
            user?: iJwtPayload;
        }
    }
}
