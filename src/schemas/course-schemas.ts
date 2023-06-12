import Joi from 'joi';
import { Prisma } from '@prisma/client';

export const createCourseSchema = Joi.object<Prisma.CoursesCreateInput>({
  name:Joi.string().required(),
});
