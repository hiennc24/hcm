import { TABLE_SALARY_GRADE, TABLE_SALARY_LEVEL, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ISalaryLevelDoc } from "../types";
mongoose.Promise = require('bluebird');

type ISalaryLevelModel = IModel<ISalaryLevelDoc>

const salaryLevelSchema = new mongoose.Schema<ISalaryLevelDoc>(
  {
    salaryGradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_SALARY_GRADE,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    jumpFactor: {
      type: Number,
      required: false, // tùy config của salary grade
    },
    factor: {
      type: Number,
      required: true, // tùy config của salary grade
    },

    isBaseFactor: {
      type: Boolean,
      default: false, // tùy config của salary grade
    },

    percentLcb: {
      type: Number,
      default: 70,
    },
    percentKpi: {
      type: Number,
      default: 30,
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
salaryLevelSchema.pre("save", preSave)

salaryLevelSchema.plugin(toJSONPlugin);
salaryLevelSchema.plugin(paginatePlugin);

/**
 * @typedef SalaryLevel
 */
export const SalaryLevelModel = mongoose.model<ISalaryLevelDoc, ISalaryLevelModel>(TABLE_SALARY_LEVEL, salaryLevelSchema);