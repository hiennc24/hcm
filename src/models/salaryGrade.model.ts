import { TABLE_SALARY_CONFIG, TABLE_SALARY_GRADE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { BASE_FACTOR_TYPES, BASIC_SALARY_TYPES, IModel, ISalaryGradeDoc } from "../types";
mongoose.Promise = require('bluebird');

type ISalaryGradeModel = IModel<ISalaryGradeDoc>

const salaryGradeSchema = new mongoose.Schema<ISalaryGradeDoc>(
  {
    salaryConfigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_SALARY_CONFIG,
      required: true,
    },

    //**** giá trị lương khởi điểm / gía trị lương tối thiểu vùng
    basicSalaryType: {
      type: String,
      enum: BASIC_SALARY_TYPES,
      required: true,
    },
    basicSalaryValue: {
      type: Number,
      required: true,
    },
    //****

    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },

    percentLcb: {
      type: Number,
      required: false,
    },
    percentKpi: {
      type: Number,
      required: false,
    },

    baseFactorType: {
      type: String,
      enum: BASE_FACTOR_TYPES,
      default: BASE_FACTOR_TYPES.BASE_FACTOR_CENTER,
    },
    baseFactorValue: {
      type: Number,
      required: true,
    },

    useBaseJumpFactor: {
      type: Boolean,
      default: true
    },
    baseJumpFactor: {
      type: Number,
      required: false,
    },

    prefixGrade: {
      type: String,
      required: true,
    },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: true,
    },

    updatedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false
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

function preSave() {
  if (this.isNew && !!this.percentLcb) {
    this.percentKpi = 100 - this.percentLcb;
  }
}
salaryGradeSchema.pre("save", preSave)

salaryGradeSchema.plugin(toJSONPlugin);
salaryGradeSchema.plugin(paginatePlugin);

/**
 * @typedef SalaryGrade
 */
export const SalaryGradeModel = mongoose.model<ISalaryGradeDoc, ISalaryGradeModel>(TABLE_SALARY_GRADE, salaryGradeSchema);