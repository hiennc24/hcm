import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),

    parentId: Joi.string().custom(customValidations.objectId),

    departmentId: Joi.string().custom(customValidations.objectId),
    personnelPositionId: Joi.string().custom(customValidations.objectId),

    startAt: Joi.string().custom(customValidations.validateDate),
    endAt: Joi.string().custom(customValidations.validateDate),

    ...customValidations.createEntityValidation
  })
};

const update = {
  params: Joi.object().keys({
    masterProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    departmentId: Joi.string().custom(customValidations.objectId),
    personnelPositionId: Joi.string().custom(customValidations.objectId),

    startAt: Joi.string().custom(customValidations.validateDate),
    endAt: Joi.string().custom(customValidations.validateDate),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    masterProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

export const masterProcessValidations = {
  create,
  update,
  dedete,
}
