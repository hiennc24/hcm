import Joi from 'joi';
import { TYPES_OF_EMPLOYMENT } from '../types';
import { customValidations } from './custom.validation';

const create = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    positionKey: Joi.string().required(),
    name: Joi.string().required(),
    level: Joi.string(),
    // forecast: Joi.number(),
    amplitude: Joi.number(),
    typesOfEmployment: Joi.string().valid(...Object.values(TYPES_OF_EMPLOYMENT)),
    attachments: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),
    personnelPositionId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    positionKey: Joi.string(),
    name: Joi.string(),
    level: Joi.string(),
    // forecast: Joi.number(),
    amplitude: Joi.number(),
    typesOfEmployment: Joi.string().valid(...Object.values(TYPES_OF_EMPLOYMENT)),
    attachments: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),
    personnelPositionId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({
    positionKey: Joi.string(),
    // forecast: Joi.number(),
    amplitude: Joi.number(),
    typesOfEmployment: Joi.string().valid(...Object.values(TYPES_OF_EMPLOYMENT)),

    ...customValidations.paginateValidation
  }),
};

export const personnelPositionValidations = {
  create,
  update,
  dedete,
  getList,
}
