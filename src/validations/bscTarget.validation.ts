import Joi from "joi"
import { BSC_TARGET_ACTION, BSC_CATEGORY_TYPE, BSC_ENTIRY_ON_MODEL } from "../types"
import { customValidations } from "./custom.validation"

const createTarget = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    // categoryId: Joi.string().custom(customValidations.objectId),
    // bscType: Joi.string(),
    unit: Joi.string(),


    action: Joi.string().optional().valid(...Object.values(BSC_TARGET_ACTION)),

    classify: Joi.alternatives().conditional('action', {
      is: BSC_TARGET_ACTION.PLAN,
      then: Joi.string().valid('Chi phí'),
      otherwise: Joi.string(),
    }),


    period: Joi.string(),
    value: Joi.number(),

    quarterly_average: Joi.string(),
    monthly_average: Joi.string(),
    measurement_methods: Joi.string(),
    measuring_frequency: Joi.string(),
    splitUpKey: Joi.array().items(
      Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL))
    ),

    ...customValidations.createEntityValidation
  }),


}

const getTarget = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
  })
}

const updateTarget = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    unit: Joi.string(),
    classify: Joi.string(),
    period: Joi.string(),
    value: Joi.number(),
    action: Joi.string().optional().valid(...Object.values(BSC_TARGET_ACTION)),
    quarterly_average: Joi.string(),
    monthly_average: Joi.string(),
    measurement_methods: Joi.string(),
    measuring_frequency: Joi.string(),
    splitUpKey: Joi.array().items(
      Joi.string().valid(...Object.values(BSC_ENTIRY_ON_MODEL))
    ),
    ...customValidations.updateEntityValidation
  })
}

const deleteTarget = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),
  }),
  body: Joi.object().keys({
    ...customValidations.deleteEntityValidation
  })
}

const getdetail = {
  params: Joi.object().keys({
    bscCategoryKey: Joi.string().optional().valid(...Object.values(BSC_CATEGORY_TYPE)).required(),
    targetId: Joi.string().custom(customValidations.objectId).required(),

    ...customValidations.searchValidation
  }),
}

export const bscTargetValidations = {
  createTarget,
  getTarget,
  updateTarget,
  deleteTarget,
  getdetail,
}