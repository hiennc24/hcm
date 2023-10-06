import Joi from 'joi';
import { customValidations } from './custom.validation';

const getAll = {
  params: Joi.object().keys({
    businessCategoryId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({

    ...customValidations.searchValidation
  })
};
const getList = {
  params: Joi.object().keys({
    businessCategoryId: Joi.string().custom(customValidations.objectId).required(),
  }),
  query: Joi.object().keys({

    ...customValidations.paginateValidation
  })
};

export const businessSectorValidations = {
  getAll,
  getList,
}
