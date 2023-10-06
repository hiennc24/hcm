import Joi from 'joi';
import { BASE_FACTOR_TYPES, BASIC_SALARY_TYPES } from '../types';
import { customValidations } from './custom.validation';

const createSalaryGrade = {
  body: Joi.object().keys({
    name: Joi.string().required(),

    // lương cơ sở
    basicSalaryType: Joi.string().valid(...Object.values(BASIC_SALARY_TYPES)).required(),
    basicSalaryValue: Joi.alternatives().conditional('basicSalaryType', {
      is: BASIC_SALARY_TYPES.SALARY_BY_STARTING,
      then: Joi.number().required(),
      otherwise: undefined,
    }),

    // lương trung tâm
    baseFactorType: Joi.string().valid(...Object.values(BASE_FACTOR_TYPES)).required(),
    baseFactorValue: Joi.number()
      .custom(customValidations.validatePositiveNumber).required(),

    // sử dụng chung bước nhảy
    useBaseJumpFactor: Joi.boolean().required(),
    baseJumpFactor: Joi.alternatives().conditional('useBaseJumpFactor', {
      is: true,
      then: Joi.number().custom(customValidations.validatePositiveNumber).required(),
      otherwise: undefined,
    }),

    prefixGrade: Joi.string().required(),

    percentLcb: Joi.number().custom(customValidations.validatPercentNumber).default(70),

    ...customValidations.createEntityValidation
  }),
};

const updateSalaryGrade = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    // lương cơ sở
    basicSalaryType: Joi.string().valid(...Object.values(BASIC_SALARY_TYPES)),
    basicSalaryValue: Joi.alternatives().conditional('basicSalaryType', {
      is: BASIC_SALARY_TYPES.SALARY_BY_STARTING,
      then: Joi.number().required(),
      otherwise: undefined,
    }),

    // lương trung tâm
    baseFactorType: Joi.string().valid(...Object.values(BASE_FACTOR_TYPES)),
    baseFactorValue: Joi.number()
      .custom(customValidations.validatePositiveNumber),

    // sử dụng chung bước nhảy
    useBaseJumpFactor: Joi.boolean(),
    baseJumpFactor: Joi.alternatives().conditional('useBaseJumpFactor', {
      is: true,
      then: Joi.number().custom(customValidations.validatePositiveNumber).required(),
      otherwise: undefined,
    }),

    prefixGrade: Joi.string(),
    percentLcb: Joi.number().custom(customValidations.validatPercentNumber),

    ...customValidations.updateEntityValidation
  }),
};

const getSalaryGrade = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

const deleteSalaryGrade = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
  }),
};

const dragSalaryGrade = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    after: Joi.string().custom(customValidations.objectId),

    ...customValidations.updateEntityValidation
  }),
};

export const salaryGradeValidations = {
  createSalaryGrade,
  getSalaryGrade,
  updateSalaryGrade,
  deleteSalaryGrade,
  dragSalaryGrade,
}
