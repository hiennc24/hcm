import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    type: Joi.string(),
    isSystem: Joi.boolean(),
    title_default: Joi.string(),
    title_custom: Joi.string(),
 

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    selectListId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    type: Joi.string(),
    isSystem:Joi.boolean(),
    title_default: Joi.string(),
    title_custom: Joi.string(),
 
 
    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    selectListId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    selectListId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
 }

export const selectListValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
}
