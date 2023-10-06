import Joi from 'joi';
import { TARGET_FORMULA_ALLOWANCE } from '../types';
import { customValidations } from './custom.validation';

const create = {
  query: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    salaryGradeId: Joi.string().custom(customValidations.objectId),

    useValueConstant: Joi.boolean().default(false),
    valueConstant: Joi.alternatives().conditional('useValueConstant', {
      is: true,
      then: Joi.number().custom(customValidations.validatePositiveNumber).required(),
      otherwise: undefined,
    }),
    valueFormula: Joi.alternatives().conditional('useValueConstant', {
      is: true,
      then: undefined,

      otherwise: Joi.object({
        percent: Joi.number().custom(customValidations.validatPercentNumber).required(),
        argument: Joi.string().valid(...Object.values(TARGET_FORMULA_ALLOWANCE)).required(),
      }),
    }),

    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    allowanceId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    shortName: Joi.string(),

    useValueConstant: Joi.boolean().default(false),
    valueConstant: Joi.alternatives().conditional('useValueConstant', {
      is: true,
      then: Joi.number().custom(customValidations.validatePositiveNumber).required(),
      otherwise: undefined,
    }),
    valueFormula: Joi.alternatives().conditional('useValueConstant', {
      is: false,
      then: Joi.object({
        percent: Joi.number().custom(customValidations.validatPercentNumber).required(),
        argument: Joi.string().valid(...Object.values(TARGET_FORMULA_ALLOWANCE)).required(),
      }),

      otherwise: undefined,
    }),

    ...customValidations.updateEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId),
  }),
  body: Joi.object().keys({
    ...customValidations.paginateValidation
  }),
};

const deleteAllowance = {
  params: Joi.object().keys({
    allowanceId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

export const allowanceValidations = {
  create,
  update,
  getList,
  deleteAllowance,
}
