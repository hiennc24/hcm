import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string(),
    phone: Joi.number(),
    cccd: Joi.number().required(),
    email: Joi.string(),
    address: Joi.string(),
    rank: Joi.string(),
    responsibility: Joi.string(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    objectUserId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    phone: Joi.number(),
    cccd: Joi.number(),
    email: Joi.string(),
    address: Joi.string(),
    rank: Joi.string(),
    responsibility: Joi.string(),
 
    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    names:  Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    objectUserId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    objectUserId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
 }

export const objectUserValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
}
