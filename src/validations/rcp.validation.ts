import Joi from 'joi';
import { NATUE_OF_COST_TYPES, RCP_TYPES } from '../types';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    parentId: Joi.string().custom(customValidations.objectId),
    year: Joi.number().custom(customValidations.validateYear)
      .when('parentId', {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.required()
      }),
    itemType: Joi.valid(...Object.values(RCP_TYPES))
      .when('parentId', {
        is: Joi.exist(),
        then: Joi.forbidden(),
        otherwise: Joi.required()
      }),
    name: Joi.string().required(),

    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    rcpId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    natueCost: Joi.string()
      .valid(...Object.values(NATUE_OF_COST_TYPES)),
    value: Joi.number()
      .custom(customValidations.validateCost),
    percent: Joi.number()
      .custom(customValidations.validatPercentNumber),

    ...customValidations.updateEntityValidation
  }),
};

const deleteItem = {
  params: Joi.object().keys({
    rcpId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  body: Joi.object().keys({

    ...customValidations.paginateValidation
  }),
};

export const rcpValidations = {
  create,
  update,
  deleteItem,
  getList,
}
