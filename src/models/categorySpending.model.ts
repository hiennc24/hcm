import mongoose, { Model } from "mongoose";
import { TABLE_CATEGORY_SPENDING, TABLE_USER } from "../config/table";
import { IModel, IcategorySpendingDoc, PROCESS_TYPES, IS_PUBLIC } from "../types";
import { toJSONPlugin, paginatePlugin } from "./plugins";
import { hashtagService } from "../services/hashtag.service";
import { categorySpendingFields } from "../config/populateConfigs";
export type ICategorySpendingModel = IModel<IcategorySpendingDoc>
const categorySpendingSchema = new mongoose.Schema<IcategorySpendingDoc, Model<IcategorySpendingDoc>>({

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
  expenseListCode: {
    type: String,
    require: false,
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
    ref: TABLE_CATEGORY_SPENDING,
    required: false,
  },
  processType: {
    type: String,
    enum: PROCESS_TYPES,
    default: PROCESS_TYPES.MPROJECT
  },
  level: {
    type: String,
    require: false,
  },
  note: {
    type: String,
    require: false,
  },
  cashItem: { // khoản mục tiền
    type: String,
    require: false,
  },
  accountingCode: { //mã hạch toán
    type: String,
    require: false,
  },
  requestProfile: { //yêu cầu hồ sơ
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

categorySpendingSchema.virtual('no')
  .get(function () { return this.position + 1 });


categorySpendingSchema.virtual('childrens', {
  ref: TABLE_CATEGORY_SPENDING,
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

function afterSave(doc: IcategorySpendingDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
categorySpendingSchema.post("save", afterSave);
categorySpendingSchema.post("findOneAndUpdate", afterSave);
categorySpendingSchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
categorySpendingSchema.pre("findOne", preFind);
categorySpendingSchema.pre('find', preFind);
categorySpendingSchema.plugin(toJSONPlugin);
categorySpendingSchema.plugin(paginatePlugin);
// add plugin that converts mongoose to json
categorySpendingSchema.index({ companyId: 1, name: 1 }, { unique: true });
export const CategorySpendingModel = mongoose.model<IcategorySpendingDoc, ICategorySpendingModel>(TABLE_CATEGORY_SPENDING, categorySpendingSchema);
