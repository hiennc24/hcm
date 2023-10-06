import Joi from 'joi';
import { SALARY_GRADE_TYPES } from '../types';
import { customValidations } from './custom.validation';

const createConfig = {
  body: Joi.object().keys({
    name: Joi.string().default("Ngạch bậc lương"),
    salaryGradeType: Joi.string()
      .valid(...Object.values(SALARY_GRADE_TYPES))
      .default(SALARY_GRADE_TYPES.TEMPLATE01),

    ...customValidations.createEntityValidation
  }),
};
const updateConfig = {
  body: Joi.object().keys({
    name: Joi.string(),

    table_configs: Joi.object({
      column_salarygrade_name: Joi.string(),
      column_factor_name: Joi.string(),
      column_lvt_name: Joi.string(),
      column_lvt_shortname: Joi.string(),
      column_lcb_name: Joi.string(),
      column_lcb_shortname: Joi.string(),
      column_lcb_percent_shortname: Joi.string(),
      column_kpi_name: Joi.string(),
      column_kpi_shortname: Joi.string(),
      column_kpi_percent_shortname: Joi.string(),
      column_total_name: Joi.string(),
      column_total_shortname: Joi.string(),
      column_description_name: Joi.string(),
      column_salarylevel_name: Joi.string(),
      column_index_name: Joi.string(),
      column_therein_name: Joi.string(),
      column_rules_name: Joi.string(),
      column_jump_name: Joi.string(),
    }),

    ...customValidations.updateEntityValidation
  }),
};

export const salaryConfigValidations = {
  createConfig,
  updateConfig,
}
