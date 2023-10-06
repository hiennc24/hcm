import Joi from "joi"
import { customValidations } from "./custom.validation"

const getClassifyById = {
  params: Joi.object().keys({
    classifyId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const createClassify = {
  body: Joi.object().keys({
    name: Joi.string(),
    bscType: Joi.string().optional().required(),

    ...customValidations.createEntityValidation
  })
}

const getListClassifyByBscType = {
  query: Joi.object().keys({
    bscType: Joi.string().optional().required(),
  })
}

export const classifyBscValidations = {
  getClassifyById,
  createClassify,
  getListClassifyByBscType
}