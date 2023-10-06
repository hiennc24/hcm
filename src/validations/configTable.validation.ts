import Joi from 'joi';
import { customValidations } from '.';

const get = {
  params: Joi.object().keys({
    tableKey: Joi.string().required(),
  }),
};
const post = {
  params: Joi.object().keys({
    tableKey: Joi.string(),
  }),
  body: Joi.object().keys({
    configs:Joi.any(),
    ...customValidations.createEntityValidation
  }),
};

const edit = {
  params: Joi.object().keys({
    tableKey: Joi.string().required(),
    columKey: Joi.string().required(),
  }),
  body: Joi.object().keys({
    length: Joi.number().required(),
    ...customValidations.updateEntityValidation
  }),
};

export const configsTableValidations = {
  post,
  edit,
  get,
}
