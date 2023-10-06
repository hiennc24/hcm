import Joi from 'joi';
import { customValidations } from './custom.validation';

const update = {
  params: Joi.object().keys({
    userId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId),
    title: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

export const userValidations = {
  update,
}
