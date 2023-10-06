import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    itemObjectCode: Joi.string().required(),
    image: Joi.string(),
    Taxcode: Joi.number().required(),
    category: Joi.string(),
    mxh: Joi.string(),
    phone: Joi.number(),
    email: Joi.string(),
    web: Joi.string(),
    address: Joi.string(),
    bankAccount: Joi.number(),
    bankName: Joi.string(),
    representativeId: Joi.string().custom(customValidations.objectId),
    tradersId: Joi.array().items(Joi.string().custom(customValidations.objectId)),
    CreditLimit: Joi.number(),
    CreditAgeLimit: Joi.string(),
    description: Joi.string(),


    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    objectListId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    itemObjectCode: Joi.string(),
    image: Joi.string(),
    Taxcode: Joi.number(),
    category: Joi.string(),
    mxh: Joi.string(),
    phone: Joi.number(),
    email: Joi.string(),
    web: Joi.string(),
    address: Joi.string(),
    bankAccount: Joi.number(),
    bankName: Joi.string(),
    representativeId: Joi.string().custom(customValidations.objectId),
    tradersId: Joi.array().items(Joi.string().custom(customValidations.objectId)),
    CreditLimit: Joi.number(),
    CreditAgeLimit: Joi.string(),
    description: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    itemObjectCodes: Joi.string(),
    isPublic: Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    objectListId: Joi.string().custom(customValidations.objectId).required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    objectListId: Joi.string().custom(customValidations.objectId).required(),

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

export const objectListValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
