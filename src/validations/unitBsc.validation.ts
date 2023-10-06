import Joi from "joi"
import { customValidations } from "./custom.validation"

const getUnitById = {
  params: Joi.object().keys({
    unitId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const createUnit = {
  body: Joi.object().keys({
    name: Joi.string(),
    bscType: Joi.string().optional().required(),

    ...customValidations.createEntityValidation
  })
}

const getListUnitByBscType = {
  query: Joi.object().keys({
    bscType: Joi.string().optional().required(),
  })
}

export const unitBscValidations = {
  getUnitById,
  createUnit,
  getListUnitByBscType
}