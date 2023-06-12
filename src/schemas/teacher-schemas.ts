import Joi from 'joi';

export const createTeacherSchema = Joi.object({
  name:Joi.string().required(),
});
