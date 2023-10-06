import Joi from 'joi';
import { customValidations } from './custom.validation';
import { LIST_COLOR } from "../types"

const create = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    backgroundColor: Joi.string().optional().valid(...Object.values(LIST_COLOR)),
    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    backgroundColor: Joi.string().optional().valid(...Object.values(LIST_COLOR)),
    ...customValidations.updateEntityValidation
  }),
};

const drag = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    after: Joi.string().custom(customValidations.objectId),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getAll = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({
    // departmentId: Joi.string().custom(customValidations.objectId),
    // positionKey: Joi.string(),
    // forecast: Joi.number(),
    // amplitude: Joi.number(),
    // typesOfEmployment: Joi.string().valid(...Object.values(TYPES_OF_EMPLOYMENT)),
  }),
};

export const businessProcessValidations = {
  create,
  update,
  drag,
  dedete,
  getAll,
}
