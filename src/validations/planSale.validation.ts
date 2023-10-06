import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    productGroupId: Joi.string().required(),
    // value: Joi.number(),

    ...customValidations.createEntityValidation
  }),
};

// const update = {
//   params: Joi.object().keys({
//     planSaleId: Joi.string().custom(customValidations.objectId).required(),
//   }),
//   body: Joi.object().keys({
//     // groupCodeId: Joi.string(),
//     value: Joi.number(),

//     ...customValidations.updateEntityValidation
//   }),
// };
const getAll = {
  query: Joi.object().keys({}),
};
const deleteOne = {
  params: Joi.object().keys({
    planSaleId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    planSaleId: Joi.string().custom(customValidations.objectId).required(),
  }),
}
export const planSaleValidations = {
  getAll,
  create,
  // update,
  deleteOne,
  getdetail,
}
