import Joi from 'joi';
import { FormatDate, FormatYear } from '../config';
import moment from 'moment'; // require

const objectId = (value: any, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: any, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const searchValidation = {
  search: Joi.string(),
};

const paginateValidation = {
  ...searchValidation,

  sortBy: Joi.string(),
  limit: Joi.number().integer(),
  page: Joi.number().integer(),
};

const createEntityValidation = {
  companyId: Joi.string().custom(objectId).required(),
  createdById: Joi.string().custom(objectId).required(),
};

const createEntityValidationWhenFind = {
  createdById: Joi.string().custom(objectId),
};

const updateEntityValidation = {
  updatedById: Joi.string().custom(objectId).required(),
};

const deleteEntityValidation = {
  deletedById: Joi.string().custom(objectId).required(),
  deletedAt: Joi.date().required(),
};

const validateNumber = (value: any, helpers: any) => {
  if (!((typeof value === "number") && Math.floor(value) === value)) {
    return helpers.message('"{{#label}}" must be a valid Number');
  }
  return value;
};

// số dương
const validatePositiveNumber = (value: any, helpers: any) => {
  if (
    typeof value === "number"
    && value > 0
  ) {
    return value;
  }
  return helpers.message('"{{#label}}" must be a valid Positive Number');
};

const validateCost = (value: any, helpers: any) => {
  if (
    typeof value === "number"
    && value >= 0
  ) {
    return value;
  }
  return helpers.message('"{{#label}}" must be a >= 0');
};

const validateStage = (value: any, helpers: any) => {
  if (
    Number.isInteger(Number(value))
    && value >= 1
    && value <= 4
  ) {
    return Number(value);
  }
  return helpers.message('"{{#label}}" invalid');
};

const validateMonth = (value: any, helpers: any) => {
  if (
    Number.isInteger(Number(value))
    && value >= 1
    && value <= 12
  ) {
    return Number(value);
  }
  return helpers.message('"{{#label}}" invalid');
};

const validateInteger = (value: any, helpers: any) => {
  if (!Number.isInteger(value)) {
    return helpers.message('"{{#label}}" must be a valid Integer');
  }
  return value;
};

const validatePositiveInteger = (value: any, helpers: any) => {
  if (!Number.isInteger(value) || value < 0) {
    return helpers.message('"{{#label}}" must be a valid Positive Integer');
  }
  return value;
};

const validatPercentNumber = (value: any, helpers: any) => {
  if (!Number.isInteger(value) || value < 0 || value > 100) {
    return helpers.message('"{{#label}}" must be between 1 and 100');
  }
  return value;
};

const validateDate = (value: any, helpers: any) => {
  if (!moment(value, FormatDate).isValid()) {
    return helpers.message('"{{#label}}" must be a valid Date');
  }
  return value;
};

const validateYear = (value: number, helpers: any) => {
  if (!moment(value.toString(), FormatYear).isValid()) {
    return helpers.message('"{{#label}}" must be a valid Date');
  }
  return value;
};

export const customValidations = {
  objectId,
  password,
  searchValidation,
  paginateValidation,
  createEntityValidation,
  updateEntityValidation,
  createEntityValidationWhenFind,
  deleteEntityValidation,
  validateDate,
  validateYear,
  validateInteger,
  validatePositiveInteger,
  validateNumber,
  validatePositiveNumber,
  validatPercentNumber,
  validateCost,
  validateStage,
  validateMonth,
}
