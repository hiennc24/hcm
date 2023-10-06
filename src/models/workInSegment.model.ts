import { TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_CORE_SEGMENT, TABLE_CORE_WORKINSEGMENT, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IWorkInSegmentDoc,LIST_COLOR } from "../types";
import { segmentFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IWorkInSegmentModel = IModel<IWorkInSegmentDoc>

const workInSegmentSchema = new mongoose.Schema<IWorkInSegmentDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      require: false,
      enum: LIST_COLOR,
    },
    segmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_SEGMENT,
      required: true,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
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
    timestamps: true
  }
);
workInSegmentSchema.virtual('grades', {
  ref: TABLE_CORE_SEGMENT,
  localField: 'segmentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});
workInSegmentSchema.virtual('department', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});



const populateArr = [
  {
    path: 'grades',
    select: segmentFields
  },
  {
    path: 'department',
    select: segmentFields
  },
];
function afterSave(doc: IWorkInSegmentDoc, next: any) {
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}

workInSegmentSchema.post("save", afterSave);
workInSegmentSchema.post("findOneAndUpdate", afterSave);
workInSegmentSchema.post("updateOne", afterSave);
function preFind(next: any) {
  next()
}
workInSegmentSchema.pre("findOne", preFind);
workInSegmentSchema.pre('find', preFind);
workInSegmentSchema.plugin(toJSONPlugin);
workInSegmentSchema.plugin(paginatePlugin);

/**
 * @typedef WorkInSegment
 */
export const WorkInSegmentModel = mongoose.model<IWorkInSegmentDoc, IWorkInSegmentModel>(
  TABLE_CORE_WORKINSEGMENT,
  workInSegmentSchema
);