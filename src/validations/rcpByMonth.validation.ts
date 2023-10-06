import Joi from 'joi';
import { customValidations } from './custom.validation';

const setOrUpdate = {
  params: Joi.object().keys({
    rcpId: Joi.string().custom(customValidations.objectId).required(),
    stageId: Joi.string().custom(customValidations.validateStage).required(),
    monthId: Joi.string().custom(customValidations.validateMonth).required(),
  }),
  body: Joi.object().keys({
    value: Joi.number()
      .custom(customValidations.validateCost).required(),

    ...customValidations.updateEntityValidation
  }),
};

export const rcpByMonthValidations = {
  setOrUpdate,
}
