import Joi from 'joi';
import { LOCATION_TYPES } from '../types';
import { customValidations } from './custom.validation';

const getAll = {
  query: Joi.object().keys({
    type: Joi.string().valid(...Object.values(LOCATION_TYPES)).required(),
    search: Joi.string(),
    parent: Joi.string().custom(customValidations.objectId),
  }),
};

export const locationValidations = {
  getAll,
}
