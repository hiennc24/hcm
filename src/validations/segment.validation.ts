import Joi from 'joi';
import { customValidations } from './custom.validation';
import { LIST_COLOR } from "../types";

const create = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    backgroundColor: Joi.string().optional().valid(...Object.values(LIST_COLOR)),
    after: Joi.string().custom(customValidations.objectId),

    ...customValidations.createEntityValidation
  }),
};

const updateById = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
    segmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    backgroundColor: Joi.string().optional().valid(...Object.values(LIST_COLOR)),

    ...customValidations.updateEntityValidation
  }),
};

const drag = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
    segmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    after: Joi.string().custom(customValidations.objectId),

    ...customValidations.updateEntityValidation
  }),
};

const dedeteById = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
    segmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({

    ...customValidations.deleteEntityValidation
  }),
};

const getAll = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({
  }),
};

// segment
export const segmentValidations = {
  create,
  updateById,
  dedeteById,
  drag,
  getAll,
}
