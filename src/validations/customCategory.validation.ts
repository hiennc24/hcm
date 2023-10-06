import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    key: Joi.string(),
    categoryCode: Joi.string(),
    managerId: Joi.string().custom(customValidations.objectId),
    note: Joi.string(),


    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    customCategoryId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    key: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    key: Joi.string(),
    categoryCode: Joi.string(),
    managerId: Joi.string().custom(customValidations.objectId),
    note: Joi.string(),


    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    categoryCodes: Joi.string(),
    isPublic: Joi.string(),

    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    customCategoryId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    key: Joi.string().required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    customCategoryId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    ...customValidations.searchValidation
  }),
}

const deleteMany = {

  body: Joi.object().keys({
    ids: Joi.any().required(),
    ...customValidations.deleteEntityValidation
  })
};

const updateMany = {
  body: Joi.object().keys({
    ids: Joi.any().required(),
    isPublic: Joi.string().required(),
    ...customValidations.updateEntityValidation
  })
};

export const customCategoryValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
