import { TABLE_COMPANY, TABLE_CUSTOM_CATEGORY, TABLE_CORE_PERSONNEL_POSITION, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IcustomCategoryDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { personnelPositionFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');
type ICustomCategoryModel = IModel<IcustomCategoryDoc>

const customCategorySchema = new mongoose.Schema<IcustomCategoryDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    position: { //stt
      type: Number,
      required: false,
    },
    key: {  //
      type: String,
      required: false,
    },
    categoryCode: { //mssp
      type: String,
      required: false,
    },
    name: {  //ten sp
      type: String,
      required: false,
    },
    managerId: { // sẽ liên kết với người quản lý or chức vụ
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_PERSONNEL_POSITION,
      required: false,
    },
    note: {
      type: String,
      required: false,
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
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);
customCategorySchema.virtual('no')
  .get(function () { return this.position + 1 });

customCategorySchema.virtual('personnelPositions', {
  ref: TABLE_CORE_PERSONNEL_POSITION,
  localField: 'managerId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'personnelPositions',
    select: personnelPositionFields,
  }
];



function afterSave(doc: IcustomCategoryDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.categoryCode,
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
customCategorySchema.post("save", afterSave);
customCategorySchema.post("findOneAndUpdate", afterSave);
customCategorySchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
customCategorySchema.pre("findOne", preFind);
customCategorySchema.pre('find', preFind);
customCategorySchema.plugin(toJSONPlugin);
customCategorySchema.plugin(paginatePlugin);

customCategorySchema.index({ companyId: 1, categoryCode: 1 }, { unique: true });

export const CustomCategoryModel = mongoose.model<IcustomCategoryDoc, ICustomCategoryModel>(TABLE_CUSTOM_CATEGORY, customCategorySchema);