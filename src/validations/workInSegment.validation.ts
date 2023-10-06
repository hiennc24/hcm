import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    segmentId: Joi.string().custom(customValidations.objectId),
    departmentId: Joi.string().custom(customValidations.objectId),
    backgroundColor:Joi.string(),

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    workInSegmentId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    segmentId: Joi.string().custom(customValidations.objectId),
    departmentId: Joi.string().custom(customValidations.objectId),
    backgroundColor:Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};
const getList = {
  body: Joi.object().keys({

    ...customValidations.paginateValidation
  }),
};
const deleteOne = {
  params: Joi.object().keys({
    workInSegmentId: Joi.string().custom(customValidations.objectId).required(),
  })
};

const groupByDepartment = {
  query: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),
  })
};

const getAll = {
  query: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId),
    segmentId: Joi.string().custom(customValidations.objectId),

    ...customValidations.searchValidation
  })
}

// workInSegment
export const workInSegmentValidations = {
  groupByDepartment,
  getAll,
  getList,
  create,
  update,
  deleteOne,
}
