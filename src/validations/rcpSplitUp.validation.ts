import Joi from 'joi';
import { BSC_ENTIRY_ON_MODEL, MONTH_KEY, RCP_TYPES } from '../types';
import { customValidations } from './custom.validation';

const create = {
  params: Joi.object().keys({
    rcpId: Joi.string().custom(customValidations.objectId),
    splitUpKey: Joi.valid(...Object.values(BSC_ENTIRY_ON_MODEL)),
    splitUpTarget: Joi.string()
      .when('splitUpKey', {
        is: BSC_ENTIRY_ON_MODEL.TABLE_DIVERGENCE,
        then: Joi.valid(...Object.values(MONTH_KEY)),
        otherwise: Joi.required()
      })
      .required(),
  }),
  body: Joi.object().keys({
    value: Joi.number()
      .custom(customValidations.validatePositiveInteger)
      .required(),

    ...customValidations.createEntityValidation
  }),
};

// const update = {
//   params: Joi.object().keys({
//     rcpSplitUpId: Joi.string().custom(customValidations.objectId).required(),
//   }),
//   body: Joi.object().keys({
//     name: Joi.string(),

//     natueCost: Joi.string()
//       .valid(...Object.values(NATUE_OF_COST_TYPES)),
//     value: Joi.number()
//       .custom(customValidations.validateCost),
//     percent: Joi.number()
//       .custom(customValidations.validatPercentNumber),

//     ...customValidations.updateEntityValidation
//   }),
// };

// const deleteItem = {
//   params: Joi.object().keys({
//     rcpSplitUpId: Joi.string().custom(customValidations.objectId).required(),
//   }),
//   body: Joi.object().keys({
//     ...customValidations.deleteEntityValidation
//   }),
// };

const getAll = {
  params: Joi.object().keys({
    rcpId: Joi.string().custom(customValidations.objectId),
    splitUpKey: Joi.valid(...Object.values(BSC_ENTIRY_ON_MODEL))
  }),
};

export const rcpSplitUpValidations = {
  create,
  // update,
  // deleteItem,
  getAll,
}
