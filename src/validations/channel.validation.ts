import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    channelCode: Joi.string().required(),
    picId: Joi.string().custom(customValidations.objectId),
    remarks: Joi.string(),
 

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    channelId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    channelCode: Joi.string(),
    picId: Joi.string().custom(customValidations.objectId),
    remarks: Joi.string(),


    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    channelCodes:  Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    channelId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    channelId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
 }

export const channelValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
}
