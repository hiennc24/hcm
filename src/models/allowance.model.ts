import { TABLE_COMPANY, TABLE_SALARY_ALLOWANCE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IAllowanceDoc, TARGET_FORMULA_ALLOWANCE } from "../types";
mongoose.Promise = require('bluebird');

type IAllowanceModel = IModel<IAllowanceDoc>

const allowanceSchema = new mongoose.Schema<IAllowanceDoc>(
  {
    salaryConfigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: false,
    },
    salaryGradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    shortNameTemp: {
      type: String,
      required: false
    },

    useValueConstant: {
      type: Boolean,
      default: false,
    },
    valueConstant: {
      type: Number,
      required: false,
    },
    valueFormula: {
      type: {
        argument: {
          type: String,
          enum: TARGET_FORMULA_ALLOWANCE,
          required: true,
        },
        percent: {
          type: Number,
          required: true,
        }
      },
      required: false,
    },

    position: {
      type: Number,
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

allowanceSchema.virtual('shortName')
  .get(function () { return this.shortNameTemp || `PC${this.position}` })
  .set(function (this: any, v: string) {
    this.set({ shortNameTemp: v })
  });

allowanceSchema.virtual('fieldKey')
  .get(function () { return `pc_${this.position}` })

allowanceSchema.plugin(toJSONPlugin);
allowanceSchema.plugin(paginatePlugin);

allowanceSchema.index({ salaryConfigId: 1, salaryGradeId: 1, position: 1 }, { unique: true })

/**
 * @typedef Allowance
 */
export const AllowanceModel = mongoose.model<IAllowanceDoc, IAllowanceModel>(TABLE_SALARY_ALLOWANCE, allowanceSchema);