import Joi from 'joi';
import { BSC_CATEGORY_TYPE, BSC_ENTIRY_ON_MODEL, MONTH_KEY, TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY } from '../types';
import { customValidations } from './custom.validation';

const getAll = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
    splitUpKey: Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL)),

    ...customValidations.searchValidation
  }),
};

const create = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
    splitUpKey: Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL)).required(),
    splitUpTarget: Joi.string()
      .when('splitUpKey', {
        is: BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE,
        then: Joi.valid(...Object.values(MONTH_KEY)),
        otherwise: Joi.required()
      })
      .required(),
  }),
  body: Joi.object().keys({
    unit: Joi.string(),
    manageById: Joi.string().valid(...Object.values(TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY)),

    value: Joi.number(),
    period: Joi.string(),
    chargeBy: Joi.string(),
    plan: Joi.string(),
    note: Joi.string(),

    ...customValidations.createEntityValidation
  }),
};

const deleteOne = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
    splitUpKey: Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL)).required(),
    splitUpTarget: Joi.string()
      .when('splitUpKey', {
        is: BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE,
        then: Joi.valid(...Object.values(MONTH_KEY)),
        otherwise: Joi.required()
      })
      .required(),
  }),
};

const getdetail = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
    splitUpKey: Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL)).required(),
    splitUpTarget: Joi.string()
      .when('splitUpKey', {
        is: BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE,
        then: Joi.valid(...Object.values(MONTH_KEY)),
        otherwise: Joi.required()
      })
      .required(),
  }),
}

export const bscDetailValidations = {
  getAll,
  create,
  deleteOne,
  getdetail,
}
