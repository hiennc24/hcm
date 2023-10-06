import { TABLE_USER, TABLE_CORE_ACCOUNTABILITY, TABLE_CORE_ACCOUNT_SEGMENT, TABLE_CORE_WORKINSEGMENT, TABLE_CORE_BUSINESS_PROCESS, TABLE_CORE_SEGMENT, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IAccountSegmentDoc } from "../types";
import { businessProcessPopulateField, segmentPopulateField, workInSegmentField } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IAccountSegmentModel = IModel<IAccountSegmentDoc>

const accountSegmentSchema = new mongoose.Schema<IAccountSegmentDoc>(
  {
    accountabilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_ACCOUNTABILITY,
      require: true,
    },
    businessProcessId: { // Tiến trình
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_BUSINESS_PROCESS,
      require: true,
    },
    segmentId: { // Phân đoạn
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_SEGMENT,
      require: true,
    },
    workInsegmentIds: { // Công việc trong phân đoạn
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: TABLE_CORE_WORKINSEGMENT,
        },
      ],
      default: [],
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

accountSegmentSchema.plugin(toJSONPlugin);
accountSegmentSchema.plugin(paginatePlugin);

accountSegmentSchema.virtual('businessProcess', {
  ref: TABLE_CORE_BUSINESS_PROCESS,
  localField: 'businessProcessId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

accountSegmentSchema.virtual('segment', {
  ref: TABLE_CORE_SEGMENT,
  localField: 'segmentId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

accountSegmentSchema.virtual('workInsegment', {
  ref: TABLE_CORE_WORKINSEGMENT,
  localField: 'workInsegmentIds',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'businessProcess',
    select: businessProcessPopulateField,
  },
  {
    path: 'segment',
    select: segmentPopulateField,
  },
  {
    path: 'workInsegment',
    select: workInSegmentField,
  },
];

function afterSave(doc: IAccountSegmentDoc, next: any) {
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}

accountSegmentSchema.post("save", afterSave);
accountSegmentSchema.post("findOneAndUpdate", afterSave);
accountSegmentSchema.post("updateOne", afterSave);

function preFind(next: any) {
  this.populate(populateArr)
  next()
}

accountSegmentSchema.pre("findOne", preFind);
accountSegmentSchema.pre('find', preFind);

export const AccountSegmentModel = mongoose.model<IAccountSegmentDoc, IAccountSegmentModel>(TABLE_CORE_ACCOUNT_SEGMENT, accountSegmentSchema);