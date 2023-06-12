import { Router } from 'express';

import { createRequirementSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { deleteRequirement, listIcRequirements, requirementPost } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const requirementsRouter = Router();

requirementsRouter
.all('/*', authenticateToken)
.post('/', validateBody(createRequirementSchema), requirementPost)
.get('/:icId', listIcRequirements)
.delete('/:requirementId',deleteRequirement)
;

export { requirementsRouter };
