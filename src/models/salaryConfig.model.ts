import { TABLE_COMPANY, TABLE_SALARY_CONFIG, TABLE_SALARY_GRADE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ISalaryConfigDoc, SALARY_GRADE_TYPES } from "../types";
import { TITLE_COLUMN_INDEX, TITLE_COLUMN_THEREIN, TITLE_JUMP_NAME, TITLE_REULES_NAME, TITLE_SALARY_DESCRIPTION, TITLE_SALARY_FACTOR, TITLE_SALARY_KPI, TITLE_SALARY_KPI_PERCENT, TITLE_SALARY_KPI_SHORT, TITLE_SALARY_LCB, TITLE_SALARY_LCB_PERCENT, TITLE_SALARY_LCB_SHORT, TITLE_SALARY_LEVEL, TITLE_SALARY_LVT, TITLE_SALARY_LVT_SHORT, TITLE_SALARY_NAME, TITLE_SALARY_TOTAL } from "../config/title";
mongoose.Promise = require('bluebird');

type ISalaryConfigModel = IModel<ISalaryConfigDoc>

const salaryConfigSchema = new mongoose.Schema<ISalaryConfigDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
      index: { unique: true }
    },
    name: {
      type: String,
      required: true,
    },
    salaryGradeType: {
      type: String,
      enum: SALARY_GRADE_TYPES,
      required: true,
    },

    table_configs: {
      column_salarygrade_name: {
        type: String,
        default: TITLE_SALARY_LEVEL,
        required: true,
      },
      column_factor_name: {
        type: String,
        default: TITLE_SALARY_FACTOR,
        required: true,
      },
      column_lvt_name: {
        type: String,
        default: TITLE_SALARY_LVT,
        required: true,
      },
      column_lvt_shortname: {
        type: String,
        default: TITLE_SALARY_LVT_SHORT,
        required: true,
      },
      column_lcb_name: {
        type: String,
        default: TITLE_SALARY_LCB,
        required: true,
      },
      column_lcb_shortname: {
        type: String,
        default: TITLE_SALARY_LCB_SHORT,
        required: true,
      },
      column_lcb_percent_shortname: {
        type: String,
        default: TITLE_SALARY_LCB_PERCENT,
        required: true,
      },
      column_kpi_name: {
        type: String,
        default: TITLE_SALARY_KPI,
        required: true,
      },
      column_kpi_shortname: {
        type: String,
        default: TITLE_SALARY_KPI_SHORT,
        required: true,
      },
      column_kpi_percent_shortname: {
        type: String,
        default: TITLE_SALARY_KPI_PERCENT,
        required: true,
      },
      column_total_name: {
        type: String,
        default: TITLE_SALARY_TOTAL,
        required: true,
      },
      column_total_shortname: {
        type: String,
        default: TITLE_SALARY_LEVEL,
        required: true,
      },
      column_description_name: {
        type: String,
        default: TITLE_SALARY_DESCRIPTION,
        required: true,
      },
      column_salarylevel_name: {
        type: String,
        default: TITLE_SALARY_NAME,
        required: true,
      },
      column_index_name: {
        type: String,
        default: TITLE_COLUMN_INDEX,
        required: true,
      },
      column_therein_name: {
        type: String,
        default: TITLE_COLUMN_THEREIN,
        required: true,
      },
      column_rules_name: {
        type: String,
        default: TITLE_REULES_NAME,
        required: true,
      },
      column_jump_name: {
        type: String,
        default: TITLE_JUMP_NAME,
        required: true,
      },
    },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },
    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
    },
    deletedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false
    },
    deletedAt: { type: Date, required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

salaryConfigSchema.virtual('grades', {
  ref: TABLE_SALARY_GRADE,
  localField: '_id',
  foreignField: 'salaryConfigId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

salaryConfigSchema.plugin(toJSONPlugin);
salaryConfigSchema.plugin(paginatePlugin);

/**
 * @typedef SalaryConfig
 */
export const SalaryConfigModel = mongoose.model<ISalaryConfigDoc, ISalaryConfigModel>(TABLE_SALARY_CONFIG, salaryConfigSchema);