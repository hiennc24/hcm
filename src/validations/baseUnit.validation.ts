import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    baseUnitCode: Joi.string().required(),
    picId: Joi.string().custom(customValidations.objectId),
    remarks: Joi.string(),
 

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    baseUnitId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    baseUnitCode: Joi.string(),
    picId: Joi.string().custom(customValidations.objectId),
    remarks: Joi.string(),


    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    baseUnitCodes:  Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    baseUnitId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    baseUnitId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
 }

export const baseUnitValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
}
