import Joi from "joi"
import { customValidations } from "./custom.validation"

const getPeriodById = {
  params: Joi.object().keys({
    periodId: Joi.string().custom(customValidations.objectId).required(),
  })
}

const createPeriod = {
  body: Joi.object().keys({
    name: Joi.string(),
    bscType: Joi.string().optional().required(),

    ...customValidations.createEntityValidation
  })
}

const getListPeriodByBscType = {
  query: Joi.object().keys({
    bscType: Joi.string().optional().required(),
  })
}

export const periodBscValidations = {
  getPeriodById,
  createPeriod,
  getListPeriodByBscType
}