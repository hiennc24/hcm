import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    Classify: Joi.string(),
    parentId: Joi.string().custom(customValidations.objectId),
    cashFlowCode: Joi.string(),
    requestProfile: Joi.string(),
    note: Joi.string(),
    level: Joi.string(),
    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    categoryCashFlowId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    key: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    Classify: Joi.string(),
    parentId: Joi.string().custom(customValidations.objectId),
    cashFlowCode: Joi.string(),
    requestProfile: Joi.string(),
    note: Joi.string(),
    level: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    isPublic: Joi.string(),
    ...customValidations.searchValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    categoryCashFlowId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    key: Joi.string().required(),
  })
};
const getdetail = {
  params: Joi.object().keys({
    categoryCashFlowId: Joi.string().custom(customValidations.objectId).required(),
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
    key: Joi.string().required(),

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

export const categoryCashFlowValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
