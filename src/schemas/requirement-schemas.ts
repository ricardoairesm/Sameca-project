import Joi from 'joi';

export const createRequirementSchema = Joi.object({
  icId:Joi.number().required(),
  courseId:Joi.number().required(),
});
