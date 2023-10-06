import mongoose, { Model } from "mongoose";
import { TABLE_CATEGORY_CASH_FLOW, TABLE_USER } from "../config/table";
import { IModel, IcategoryCashFlowDoc, PROCESS_TYPES, IS_PUBLIC } from "../types";
import { toJSONPlugin, paginatePlugin } from "./plugins";
import { hashtagService } from "../services/hashtag.service";
import { categorySpendingFields } from "../config/populateConfigs";

export type ICategoryCashFlowModel = IModel<IcategoryCashFlowDoc>
const categoryCashFlowSchema = new mongoose.Schema<IcategoryCashFlowDoc, Model<IcategoryCashFlowDoc>>({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  position: { //stt
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  Classify: {
    type: String,
    require: false,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_CATEGORY_CASH_FLOW,
    required: false,
  },
  processType: {
    type: String,
    enum: PROCESS_TYPES,
    default: PROCESS_TYPES.MPROJECT
  },
  cashFlowCode: {
    type: String,
    require: false,
  },
  requestProfile: { //yêu cầu hồ sơ
    type: String,
    require: false,
  },
  note: {
    type: String,
    require: false,
  },
  level: {
    type: String,
    require: false,
  },
  isPublic: {
    type: String,
    enum: IS_PUBLIC,
    default: IS_PUBLIC.PUBLIC
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
  })

categoryCashFlowSchema.virtual('no')
  .get(function () { return this.position + 1 });


categoryCashFlowSchema.virtual('childrens', {
  ref: TABLE_CATEGORY_CASH_FLOW,
  localField: '_id',
  foreignField: 'parentId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'childrens',
    select: categorySpendingFields
  },
];

function afterSave(doc: IcategoryCashFlowDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
categoryCashFlowSchema.post("save", afterSave);
categoryCashFlowSchema.post("findOneAndUpdate", afterSave);
categoryCashFlowSchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
categoryCashFlowSchema.pre("findOne", preFind);
categoryCashFlowSchema.pre('find', preFind);
categoryCashFlowSchema.plugin(toJSONPlugin);
categoryCashFlowSchema.plugin(paginatePlugin);
categoryCashFlowSchema.index({ companyId: 1, name: 1 }, { unique: true });
export const CategoryCashFlowModel = mongoose.model<IcategoryCashFlowDoc, ICategoryCashFlowModel>(TABLE_CATEGORY_CASH_FLOW, categoryCashFlowSchema);
