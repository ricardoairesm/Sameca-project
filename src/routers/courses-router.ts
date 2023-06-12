import { Router } from 'express';

import { createCourseSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { coursesPost, listCourses } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const coursesRouter = Router();

coursesRouter
.all('/*', authenticateToken)
.post('/', validateBody(createCourseSchema), coursesPost)
.get('/', listCourses)
;

export { coursesRouter };
