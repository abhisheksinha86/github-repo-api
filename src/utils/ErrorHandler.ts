import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';
import ErrorRes from '../interfaces/errorRes.interface';

export const notFoundError = () => {
    throw new HTTP404Error('Method not found.');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
    if (err instanceof HTTPClientError) {
        //console.warn(err);
        const resObj: ErrorRes = { status: err.statusCode, message: err.message };
        res.status(err.statusCode).send(resObj);
    } else {
        next(err);
    }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
    //console.error(err);
    if (err.name == 'StatusCodeError') {
        const resObj: ErrorRes = { status: 404, message: err.message };
        res.status(404).send(resObj);
    } else {
        const resObj: ErrorRes = { status: 500, message: err.message };
        res.status(500).send(resObj);
    }
};
