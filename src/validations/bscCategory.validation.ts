import Joi from 'joi';
import { BSC_CATEGORY_TYPE } from '../types';
import { customValidations } from './custom.validation';

const updateCategory = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
  }),
  body: Joi.object().keys({
    description: Joi.string(),
    backgroudColor: Joi.string(),
    ...customValidations.updateEntityValidation
  }),
}
const getdetail = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),

    ...customValidations.searchValidation
  }),
}

export const bscCategoryValidations = {
  updateCategory, getdetail
}
