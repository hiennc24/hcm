import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
    key: Joi.string(),
    status: Joi.string(),
    isSystem: Joi.boolean(),
    relateModule: Joi.string(),

    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    key: Joi.string(),
    status: Joi.string(),
    isSystem: Joi.boolean(),
    relateModule: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

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

const getAll = {
  query: Joi.object().keys({
    isPublic: Joi.string(),

    ...customValidations.searchValidation
  }),
};

const deleteOne = {
  params: Joi.object().keys({
    administrationListId: Joi.string().custom(customValidations.objectId).required(),
  })
};

const getdetail = {
  params: Joi.object().keys({
    administrationListId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
}

export const administrationListValidations = {
  getAll,
  create,
  update,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
