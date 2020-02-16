import { Request, Response } from 'express';
import { getUserReposInfo } from './userRepoInfoController';
import { validateReq } from '../../middleware/validateReq';

export default [
    {
        path: '/',
        method: 'get',
        handler: async (req: Request, res: Response) => {
            res.send('Hello world!');
        },
    },
    {
        path: '/api/v1/userrepoinfo',
        method: 'get',
        handler: [
            validateReq,
            async ({ query }: Request, res: Response) => {
                const result = await getUserReposInfo(query.user);
                res.status(200).send(result);
            },
        ],
    },
];
