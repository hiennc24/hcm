import Joi from 'joi';
import { customValidations } from './custom.validation';

const createSalaryLevel = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    percentLcb: Joi.number().custom(customValidations.validatPercentNumber),

    ...customValidations.createEntityValidation
  }),
};

const updateSalaryLevel = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
    salaryLevelId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    jumpFactor: Joi.number().custom(customValidations.validatePositiveNumber),
    percentLcb: Joi.number().custom(customValidations.validatPercentNumber),

    ...customValidations.updateEntityValidation
  }),
};

const deleteSalaryLevel = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
    salaryLevelId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const changeSalaryLevelBase = {
  params: Joi.object().keys({
    salaryGradeId: Joi.string().custom(customValidations.objectId).required(),
    salaryLevelId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.updateEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({
    ...customValidations.paginateValidation
  }),
};

export const salaryLevelValidations = {
  changeSalaryLevelBase,
  createSalaryLevel,
  updateSalaryLevel,
  deleteSalaryLevel,
  getList,
}
