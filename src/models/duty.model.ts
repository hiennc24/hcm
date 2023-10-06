import { TABLE_USER, TABLE_CORE_DUTY, TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_CORE_ACCOUNTABILITY, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IDutyDoc } from "../types";
mongoose.Promise = require('bluebird');

type IDutyModel = IModel<IDutyDoc>

// chức năng nhiệm vụ
const dutySchema = new mongoose.Schema<IDutyDoc>(
  {
    name: {
      type: String,
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
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

dutySchema.plugin(toJSONPlugin);
dutySchema.plugin(paginatePlugin);

dutySchema.virtual('accountabilitys', {
  ref: TABLE_CORE_ACCOUNTABILITY,
  localField: '_id',
  foreignField: 'dutyId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'accountabilitys',
    // select: accountB,
    options: {
      skipPopulateDuty: true,
    }
  },
];
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
dutySchema.pre("findOne", preFind);
dutySchema.pre('find', preFind);

/**
 * @typedef Duty
 */
export const DutyModel = mongoose.model<IDutyDoc, IDutyModel>(TABLE_CORE_DUTY, dutySchema);