import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    itemGroupCode: Joi.string(),
    image: Joi.string(),
    unit: Joi.string(),
    importPrice: Joi.number(),
    sellingPrice: Joi.number(),
    tax: Joi.number(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    productCategoryId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    itemGroupCode: Joi.string(),

    image: Joi.string(),
    unit: Joi.string(),
    importPrice: Joi.number(),
    sellingPrice: Joi.number(),
    tax: Joi.number(),

    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    itemGroupCodes: Joi.string(),
    importPrice: Joi.number(),
    sellingPrice: Joi.number(),
    tax: Joi.number(),
    isPublic: Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    productCategoryId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    productCategoryId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
}
const deleteMany = {
  body: Joi.object().keys({
    ids: Joi.any().required(),

    ...customValidations.deleteEntityValidation
  }),
}

const updateMany = {
  body: Joi.object().keys({
    ids: Joi.any().required(),
    isPublic: Joi.string().required(),
    ...customValidations.updateEntityValidation
  })
};

export const productCategoryValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
