import Joi from 'joi';
import { MANDATE_KEY } from '../types';
import { customValidations } from './custom.validation';

const create = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    name: Joi.string(),
    departmentId: Joi.string().custom(customValidations.objectId),
    // mandates: Joi.array(),
    attachments: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),

    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),

    dutyId: Joi.string().custom(customValidations.objectId),

    departmentId: Joi.string().custom(customValidations.objectId),
    // mandates: Joi.array(),

    attachments: Joi.array().items(
      Joi.string().custom(customValidations.objectId)
    ),

    ...customValidations.updateEntityValidation
  }),
};

const dedete = {
  params: Joi.object().keys({
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  }),
};

const getList = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({

    ...customValidations.paginateValidation
  }),
};
const getAll = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({
    departmentId: Joi.string().custom(customValidations.objectId),
  }),
};

const updateMandate = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
    personnelPositionId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    mandateKey: Joi.string().optional().valid(...Object.values(MANDATE_KEY)).required(),

    ...customValidations.updateEntityValidation
  }),
};

const updateValueChain = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    valueChainId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.updateEntityValidation
  }),
};
const updateBusinessProcess = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.updateEntityValidation
  }),
};
const updateSegment = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    segmentId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.updateEntityValidation
  }),
};
const addWork = {
  params: Joi.object().keys({
    dutyId: Joi.string().custom(customValidations.objectId).required(),
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
    workInSegmentId: Joi.string().custom(customValidations.objectId),
  }),
  body: Joi.object().keys({
    ...customValidations.updateEntityValidation
  }),
};

export const accountabilityValidations = {
  create,
  update,
  dedete,
  getList,
  getAll,

  updateMandate,
  updateValueChain,
  updateBusinessProcess,
  updateSegment,
  addWork,
}
