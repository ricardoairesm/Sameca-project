import { Router } from 'express';
import { getIcById, icsPost, listIcs } from '@/controllers';
import { validateBody } from '@/middlewares';
import { createIcSchema } from '@/schemas';
import { authenticateToken } from '@/middlewares';

const icsRouter = Router();

icsRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(createIcSchema), icsPost)
    .get('/', listIcs)
    .get('/:icId', getIcById)
    ;

export { icsRouter };
