import Joi from 'joi';
import { customValidations } from './custom.validation';

const create = {
  body: Joi.object().keys({
    productGroupCode: Joi.string().required(),
    commodityCode: Joi.string().required(),
    image: Joi.string().required(),
    name: Joi.string(),
    unit: Joi.string(),
    conversionUnit1: Joi.object({
      name: Joi.string().required(),
      rate: Joi.number().custom(customValidations.validateInteger).required(),
    }),
    conversionUnit2: Joi.object({
      name: Joi.string().required(),
      rate: Joi.number().custom(customValidations.validateInteger).required(),
    }),
    conversionUnit3: Joi.object({
      name: Joi.string().required(),
      rate: Joi.number().custom(customValidations.validateInteger).required(),
    }),
    isActive: Joi.boolean().default(true),

    purchasePrice: Joi.number().custom(customValidations.validateInteger).required(),
    retailPrice: Joi.number().custom(customValidations.validateInteger),
    wholesalePrice: Joi.number().custom(customValidations.validateInteger),
    otherPrice: Joi.number().custom(customValidations.validateInteger),

    tax: Joi.number().custom(customValidations.validatPercentNumber),
    otherTax: Joi.number().custom(customValidations.validatPercentNumber),

    category: Joi.string(), // phan loai
    quantitative: Joi.string(), // Định lượng
    grade: Joi.string(), // Phẩm cấp
    packingSpecification: Joi.string(),// Quy cách đóng gói,
    origin: Joi.string(), // nguồn gốc
    dueDate: Joi.string().custom(customValidations.validateDate), // hạn sử dụng

    ...customValidations.createEntityValidation
  }),
};
const update = {
  params: Joi.object().keys({
    materialsSpareId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    productGroupCode: Joi.string(),
    commodityCode: Joi.string(),
    image: Joi.string(),
    name: Joi.string(),
    unit: Joi.string()
      .custom(customValidations.validatePositiveNumber),

    conversionUnit1: Joi.string()
      .custom(customValidations.validatePositiveNumber),
    conversionUnit2: Joi.string()
      .custom(customValidations.validatePositiveNumber),
    conversionUnit3: Joi.string()
      .custom(customValidations.validatePositiveNumber),
    isActive: Joi.boolean(),

    purchasePrice: Joi.number()
      .custom(customValidations.validatePositiveNumber),
    retailPrice: Joi.number()
      .custom(customValidations.validatePositiveNumber),
    wholesalePrice: Joi.number()
      .custom(customValidations.validatePositiveNumber),
    otherPrice: Joi.number()
      .custom(customValidations.validatePositiveNumber),

    tax: Joi.number()
      .custom(customValidations.validatPercentNumber),
    otherTax: Joi.number()
      .custom(customValidations.validatPercentNumber),

    category: Joi.string(), // phan loai
    quantitative: Joi.number(), // Định lượng
    grade: Joi.string(), // Phẩm cấp
    packingSpecification: Joi.string(),// Quy cách đóng gói,
    origin: Joi.string(),
    dueDate: Joi.string(),

    ...customValidations.updateEntityValidation
  }),
};
const getAll = {
  query: Joi.object().keys({
    commodityCodes: Joi.string(),
    category: Joi.string(),
    isActive: Joi.boolean(),
    isPublic: Joi.string(),

    ...customValidations.searchValidation
  }),
}
const deleteOne = {
  params: Joi.object().keys({
    materialsSpareId: Joi.string().custom(customValidations.objectId).required(),
  })
}
const getdetail = {
  params: Joi.object().keys({
    materialsSpareId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
}

const deleteMany = {
  body: Joi.object().keys({
    ids: Joi.any().required(),

    ...customValidations.deleteEntityValidation
  }),
}

const updateMany = {
  body: Joi.object().keys({
    ids: Joi.any().required(),
    isPublic: Joi.string().required(),
    ...customValidations.updateEntityValidation
  })
};

export const materialsSpareValidations = {
  create,
  update,
  getAll,
  deleteOne,
  getdetail,
  deleteMany,
  updateMany,
}
