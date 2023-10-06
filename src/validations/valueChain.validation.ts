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
    valueChainId: Joi.string().custom(customValidations.objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({

    ...customValidations.paginateValidation
  })
};

export const valueChainValidations = {
  create,
  update,
  dedete,
  getList,
}
