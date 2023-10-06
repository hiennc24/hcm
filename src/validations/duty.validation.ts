import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  query: {
    departmentId: Joi.string().custom(customValidations.objectId).required(),
  },
  body: Joi.object().keys({
    name: Joi.string().required(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  query: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.paginateValidation
  }),
};

export const dutyValidations = {
  create,
  update,
  dedete,
  getList,
}
