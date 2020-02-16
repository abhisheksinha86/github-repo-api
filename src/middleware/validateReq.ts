import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';
import { HTTP406Error } from '../utils/httpErrors';

export const validateReq = (req: Request, res: Response, next: NextFunction) => {
    if (req.header('Accept') != 'application/json') {
        throw new HTTP406Error('Allowed header is Accept: application/json');
    } else if (!req.query.user) {
        throw new HTTP400Error('Badrequest - queryparam user is mandatory');
    } else {
        next();
    }
};
