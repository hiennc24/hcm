import Joi from 'joi';
import { customValidations } from '.';
import { ISURACE_TYPES, SURACE_PAY_TYPES } from '../types';

const setSalaryConfigType = {
  body: Joi.object().keys({
    useStartingSalary: Joi.boolean().required(),

    ...customValidations.updateEntityValidation
  }),
};

const addRegionConfig = {
  body: Joi.object().keys({
    provinceId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.createEntityValidation
  }),
};

const updateRegionConfig = {
  params: Joi.object().keys({
    regionId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    provinceId: Joi.string().custom(customValidations.objectId),
    districtId: Joi.string().custom(customValidations.objectId),
    minimum: Joi.number().custom(customValidations.validatePositiveInteger),
    applyTo: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

const deleteRegionConfig = {
  params: Joi.object().keys({
    regionId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

const updateInsurance = {
  body: Joi.object().keys({
    isuraceType: Joi.string().valid(...Object.values(ISURACE_TYPES)).required(),
    payType: Joi.string().valid(...Object.values(SURACE_PAY_TYPES)).required(),
    percent: Joi.number().custom(customValidations.validatPercentNumber).required(),
  }),
};

export const companyConfigsValidations = {
  setSalaryConfigType,
  addRegionConfig,
  updateRegionConfig,
  deleteRegionConfig,

  updateInsurance,
}
