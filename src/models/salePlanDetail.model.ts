import {
  TABLE_COMPANY, TABLE_CORE_PRODUCT_CATEGORY, TABLE_CORE_PRODUCT_GROUP,
  TABLE_PLAN_SALE_DETAIL, TABLE_USER,
} from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ISalePlanDetailDoc } from "../types";
mongoose.Promise = require('bluebird');

type ISalePlanDetailModel = IModel<ISalePlanDetailDoc>
const salePlanDetailSchema = new mongoose.Schema<ISalePlanDetailDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    salePlanId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'salePlanModel',
    },
    salePlanModel: {
      type: String,
      require: true,
      enum: [TABLE_CORE_PRODUCT_GROUP, TABLE_CORE_PRODUCT_CATEGORY],
    },

    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      required: false,
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

salePlanDetailSchema.virtual('salePlanItem', {
  ref: function () { return this.salePlanModel; },
  localField: 'salePlanId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'salePlanItem',
    // select: bscTable2Fields,
  },
];

function afterSave(doc: ISalePlanDetailDoc, next: any) {
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
salePlanDetailSchema.post("save", afterSave);
salePlanDetailSchema.post("findOneAndUpdate", afterSave);
salePlanDetailSchema.post("updateOne", afterSave);

function preFind(next: any) {
  this.populate(populateArr)
  next()
}
salePlanDetailSchema.pre("findOne", preFind);
salePlanDetailSchema.pre('find', preFind);

salePlanDetailSchema.index({ salePlanId: 1, companyId: 1 }, { unique: true })

salePlanDetailSchema.plugin(toJSONPlugin);
salePlanDetailSchema.plugin(paginatePlugin);

/**
 * @typedef SalePlanDetail
 */
export const SalePlanDetailModel = mongoose.model<ISalePlanDetailDoc, ISalePlanDetailModel>(TABLE_PLAN_SALE_DETAIL, salePlanDetailSchema);