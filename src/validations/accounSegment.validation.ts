import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  params: Joi.object().keys({
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
    segmentId: Joi.string().custom(customValidations.objectId).required(),
    workInsegmentIds: Joi.array(),
    
    ...customValidations.createEntityValidation
  }),
};

const update = {
  params: Joi.object().keys({
    accountabilityId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    businessProcessId: Joi.string().custom(customValidations.objectId).required(),
    workInsegmentIds: Joi.array().items(Joi.string().custom(customValidations.objectId)),
    
    ...customValidations.updateEntityValidation
  }),
};

export const accountSegmentValidations = {
  create,
  update,
}
