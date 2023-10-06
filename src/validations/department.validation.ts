import Joi from 'joi';
import { EDITABLE_SYSTEM_DEPARTMENT_TYPE } from '../modules';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    parentId: Joi.string().custom(customValidations.objectId).required(),
    backgroundColor: Joi.string(),

    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    parentId: Joi.string().custom(customValidations.objectId),
    backgroundColor: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

const deleteById = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({

    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({
    search: Joi.string(),
    departmentId: Joi.string().custom(customValidations.objectId),
    hasSystem: Joi.boolean().default(false),
  }),
};

const getTree = {
  query: Joi.object().keys({
    search: Joi.string(),
    departmentId: Joi.string().custom(customValidations.objectId),
    hasPosition: Joi.boolean(),
    hasSystem: Joi.boolean(),
  }),
};

const getdetail = {
  params: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
}

const activeSystem = {
  body: Joi.object().keys({
    systemType: Joi.string().valid(...Object.values(EDITABLE_SYSTEM_DEPARTMENT_TYPE)).required(),

    ...customValidations.createEntityValidation
  }),
};
const unActiveSystem = {
  body: Joi.object().keys({
    systemType: Joi.string().valid(...Object.values(EDITABLE_SYSTEM_DEPARTMENT_TYPE)).required(),

    ...customValidations.deleteEntityValidation
  }),
};

export const departmentValidations = {
  create,
  update,
  deleteById,
  getList,
  activeSystem,
  unActiveSystem,
  getdetail,
  getTree,
}
