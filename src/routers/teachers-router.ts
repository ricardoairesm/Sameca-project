import { Router } from 'express';

import { createTeacherSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { getTeachers, teachersPost } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const teachersRouter = Router();

teachersRouter
.all('/*', authenticateToken)
.post('/', validateBody(createTeacherSchema),teachersPost)
.get('/',getTeachers);
;

export { teachersRouter };
