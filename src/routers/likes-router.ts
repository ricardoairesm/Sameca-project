import { Router } from 'express';

import { createLikeSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { likesPost, listIcLikes, listUserLikes, unlikePost, } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const likesRouter = Router();

likesRouter
.all('/*', authenticateToken)
.post('/', validateBody(createLikeSchema), likesPost)
.get('/user/:userId', listUserLikes)
.get('/:icId', listIcLikes)
.delete('/',unlikePost)
;

export { likesRouter };
