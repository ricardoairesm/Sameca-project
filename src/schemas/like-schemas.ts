import Joi from 'joi';

export const createLikeSchema = Joi.object({
  userId:Joi.number().required(),
  icId:Joi.number().required(),
});
