import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    mandatesId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

export const mandatesValidations = {
  create,
  update,
}
