import Joi from 'joi';
import { Prisma } from '@prisma/client';

export const createIcSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    gratification: Joi.string().required(),
    gratificationSpots: Joi.number().required(),
    teacherId:Joi.number().required(),
});
