import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    itemGroupCode: Joi.string(),

    image: Joi.string(),
    description: Joi.string(),
    isActive: Joi.boolean().default(true),
    typeLabel: Joi.string().required(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    productGroupId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    itemGroupCode: Joi.string(),

    image: Joi.string(),
    description: Joi.string(),
    isActive: Joi.boolean(),

    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    itemGroupCodes: Joi.string(),
    isActive: Joi.boolean(),
    isPublic: Joi.string(),
    typeLabel: Joi.string(),
    position: Joi.number(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    productGroupId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    productGroupId: Joi.string().custom(customValidations.objectId).required(),

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

export const productGroupValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
