import Joi from 'joi';

const getVariable = {
  query: Joi.object().keys({
    type: Joi.string().valid(
      "TYPES_OF_EMPLOYMENT",
      "NATUE_OF_COST_TYPES",
      "PROCESS_TYPES",
      "TYPES_OF_LABEL",
    ).required(),
  })
};

export const variableValidations = {
  getVariable,
}
