import mongoose, { Model } from "mongoose";
import { TABLE_BSC_TARGET, TABLE_USER, TABLE_BSC_CATEGORY } from "../config/table";
import { BSC_TARGET_ACTION, PERIOD_BSC, IModel, BSC_ENTIRY_ON_MODEL, ITargetBscDoc, HASHTAG_TYPES, BSC_CATEGORY_TYPE } from "../types";
import { toJSONPlugin, paginatePlugin } from "./plugins";
import { bscFields } from "../config/populateConfigs";
// import { hashtagService } from "../services/hashtag.service";

export type ITargetBscModel = IModel<ITargetBscDoc>
const bscTargetSchema = new mongoose.Schema<ITargetBscDoc, Model<ITargetBscDoc>>({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
  },
  // bscType: {
  //   type: String, //TODO ==> đưa về enum + api để client chọn
  //   require: true,
  // },
  // categoryId: { //bsc category
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: TABLE_BSC_CATEGORY,
  //   require: true,
  // },
  bscCategoryKey: {
    type: String,
    enum: BSC_CATEGORY_TYPE,
    required: true,
  },
  unit: { // Đơn vị
    type: String,
  },
  classify: { // thuộc tính
    type: String,
  },
  period: { // Kỳ đo
    type: String,
    enum: PERIOD_BSC,
  },
  value: { // Giá trị
    type: Number,
  },
  action: { // hành động
    type: String,
    enum: BSC_TARGET_ACTION,
  },
  measurement_methods: { // Phương pháp đo
    type: String,
  },
  measuring_frequency: { // Tần suất đo
    type: String,
  },
  splitUpKey: [{ // phân rã
    type: String,
    enum: BSC_ENTIRY_ON_MODEL,
    required: false,
  }],

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

bscTargetSchema.virtual('quarterly_average')
  .get(function () {
    return this.period == PERIOD_BSC.year
      ? this.value / 4
      : null
  });
bscTargetSchema.virtual('monthly_average')
  .get(function () {
    return this.period == PERIOD_BSC.year
      ? this.value / 12
      : null || this.period == PERIOD_BSC.quarterly
        ? this.value / 3
        : null
  });

bscTargetSchema.virtual('CategorysBsc', {
  ref: TABLE_BSC_CATEGORY,
  localField: 'categoryId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});
const populateArr = [
  {
    path: 'CategorysBsc',
    select: bscFields,
  }
];
function afterSave(doc: ITargetBscDoc, next: any) {
  // hashtagService.createOrUpdate({
  //   companyId: doc.companyId,
  //   target: HASHTAG_TYPES.DETAIL_CORE
  // }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
bscTargetSchema.post("save", afterSave);
bscTargetSchema.post("findOneAndUpdate", afterSave);
bscTargetSchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
bscTargetSchema.pre("findOne", preFind);
bscTargetSchema.pre('find', preFind);
bscTargetSchema.plugin(toJSONPlugin);
bscTargetSchema.plugin(paginatePlugin);
// add plugin that converts mongoose to json


export const TargetBscModel = mongoose.model<ITargetBscDoc, ITargetBscModel>(TABLE_BSC_TARGET, bscTargetSchema);
