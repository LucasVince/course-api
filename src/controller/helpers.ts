import { HttpStatusCode } from './protocols';

export const ok = (message: any) => {
    return {
        statusCode: HttpStatusCode.OK,
        body: message,
    };
};

export const created = (message: any) => {
    return {
        statusCode: HttpStatusCode.CREATED,
        body: message,
    };
};

export const badRequest = (message: any) => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message,
    };
};

export const notFound = (message: any) => {
    return {
        statusCode: HttpStatusCode.NOT_FOUND,
        body: message,
    };
};

export const serverError = (message: any) => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: message,
    };
};
