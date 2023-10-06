import { TABLE_BSC_TARGET, TABLE_COMPANY, TABLE_BSC_TARDET_DETAIL, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { PERIOD_BSC, BSC_ENTIRY_ON_MODEL, IModel, IBscDetailDoc, MONTH_KEY, SPLITUP_ON_MODEL, BSC_CATEGORY_TYPE, TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY } from "../types";
import { bscTable2Fields } from "../config/populateConfigs";

mongoose.Promise = require('bluebird');
type IBscDetailModel = IModel<IBscDetailDoc>

const bscDetailSchema = new mongoose.Schema<IBscDetailDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    bscCategoryKey: {
      type: String,
      enum: BSC_CATEGORY_TYPE,
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_BSC_TARGET,
      required: true,
    },

    splitUpKey: {
      type: String,
      required: true,
      enum: BSC_ENTIRY_ON_MODEL
    },
    splitUpId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      refPath: 'splitUpModel'
    },
    splitUpModel: {
      type: String,
      required: false,
      enum: SPLITUP_ON_MODEL
    },
    splitByMonth: {
      type: String,
      required: false,
      enum: MONTH_KEY
    },

    position: { //stt
      type: Number,
      required: false,
    },

    unit: {
      type: String,
      required: false,
    },
    manageById: {
      type: String,
      enum: TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY,
      required: false,
    },
    value: { // Giá trị
      type: Number,
    },
    period: { // Kỳ đo
      type: String,
      enum: PERIOD_BSC,
    },
    chargeBy: { //phụ trách
      type: String,
      required: false,
    },
    plan: { //kế hoạch đã lập
      type: String,
      required: false,
    },
    note: { //+/-
      type: String,
      required: false,
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
bscDetailSchema.plugin(toJSONPlugin);
bscDetailSchema.plugin(paginatePlugin);

bscDetailSchema.virtual('no')
  .get(function () { return this.position + 1 });

bscDetailSchema.virtual('quarterly_average')
  .get(function () {
    return this.period == PERIOD_BSC.year
      ? this.value / 4
      : null
  });
bscDetailSchema.virtual('monthly_average')
  .get(function () {
    return this.period == PERIOD_BSC.year
      ? this.value / 12
      : null || this.period == PERIOD_BSC.quarterly
        ? this.value / 3
        : null
  });

bscDetailSchema.virtual('splitUpTarget', {
  ref: function () { return this.splitUpModel; },
  localField: 'splitUpId',
  foreignField: '_id',
  justOne: true
});

const populateArr = [
  { path: 'splitUpTarget' },
];

function afterSave(doc: IBscDetailDoc, next: any) {
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
bscDetailSchema.post("save", afterSave);
bscDetailSchema.post("findOneAndUpdate", afterSave);
bscDetailSchema.post("updateOne", afterSave);

function preFind() {
  this.populate(populateArr)
}
bscDetailSchema.pre("findOne", preFind);
bscDetailSchema.pre('find', preFind);

/**
 * @typedef BaseUnit
 */
export const BscDetailModel = mongoose.model<IBscDetailDoc, IBscDetailModel>(
  TABLE_BSC_TARDET_DETAIL, bscDetailSchema
);
