import Joi from "joi"
import { BSC_ENTIRY_ON_MODEL } from "../types"
import { customValidations } from "./custom.validation"

const getHashTag = {
  params: Joi.object().keys({
    hashTagId: Joi.string().custom(customValidations.objectId).required(),
  })
}
// BSC_ENTIRY_ON_MODEL
const createHashTag = {
  body: Joi.object().keys({
    name: Joi.string(),
    bscType: Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL)).required(),
    unit: Joi.string(),
    classify: Joi.string(),
    period: Joi.string(),

    ...customValidations.createEntityValidation
  })
}

const getListHashtagByBscType = {
  query: Joi.object().keys({
    bscType: Joi.string().optional().required(),
  })
}

export const hashTagBscValidations = {
  getHashTag,
  createHashTag,
  getListHashtagByBscType
}