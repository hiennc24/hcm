import Joi from 'joi';
import { customValidations } from './custom.validation';

const getAll = {
  query: Joi.object().keys({

    ...customValidations.searchValidation
  })
};
const getList = {
  query: Joi.object().keys({

    ...customValidations.paginateValidation
  })
};

export const businessCategoryValidations = {
  getAll,
  getList,
}
