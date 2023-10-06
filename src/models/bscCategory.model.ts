import mongoose, { Model } from "mongoose";
import { TABLE_USER, TABLE_BSC_CATEGORY, TABLE_BSC_TARGET } from "../config/table";
import { BSC_CATEGORY_TYPE, ICategoryBscDoc, ICON_CATEGORY, IModel, TITLE_CATEGORY } from "../types";
import { toJSONPlugin, paginatePlugin } from "./plugins";

export type IBscCategoryModel = IModel<ICategoryBscDoc>
const bscCategorySchema = new mongoose.Schema<ICategoryBscDoc, Model<ICategoryBscDoc>>({ //bảng thẻ bsc
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bscCategoryKey: {
    type: String,
    enum: BSC_CATEGORY_TYPE,
    required: true,
  },
  icon: {
    type: String,
    enum: ICON_CATEGORY,
    required: true,
  },
  backgroundColor: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    enum: TITLE_CATEGORY,
    require: true,
  },
  description: {
    type: String,
    require: false
  },
  position: {
    type: Number,
    require: false
  },
  // bscTargetId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: TABLE_BSC_TARGET,
  //   required: false,
  // },
  // createdById: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: TABLE_USER,
  //   required: true,
  // },
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
      // createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  })
bscCategorySchema.plugin(toJSONPlugin);
bscCategorySchema.plugin(paginatePlugin);

bscCategorySchema.virtual('bscTargets', {
  ref: TABLE_BSC_TARGET,
  localField: 'bscCategoryKey',
  foreignField: 'bscCategoryKey',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'bscTargets',
    // select: bscTarget,
  }
];

function afterSave(doc: ICategoryBscDoc, next: any) {
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
bscCategorySchema.post("save", afterSave);
bscCategorySchema.post("findOneAndUpdate", afterSave);
bscCategorySchema.post("updateOne", afterSave);

function preFind(next: any) {
  this.populate(populateArr)
  next()
}
bscCategorySchema.pre("findOne", preFind);
bscCategorySchema.pre('find', preFind);

bscCategorySchema.index({ companyId: 1, title: 1 }, { unique: true });
export const BscCategoryModel = mongoose.model<ICategoryBscDoc, IBscCategoryModel>(TABLE_BSC_CATEGORY, bscCategorySchema);


