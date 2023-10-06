import { TABLE_COMPANY, TABLE_CORE_PRODUCT_CATEGORY, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IProductCategoryDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { number } from "joi";
mongoose.Promise = require('bluebird');
type IProductCategoryModel = IModel<IProductCategoryDoc>

const productCategorySchema = new mongoose.Schema<IProductCategoryDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    name: {  //ten sp
      type: String,
      required: false,
    },
    position: { //stt
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    itemGroupCode: { //mssp
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    importPrice: {
      type: Number,
      require: false,
    },
    sellingPrice: {
      type: Number,
      require: false,
    },
    tax: {
      type: Number,
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
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);
productCategorySchema.virtual('no')
  .get(function () { return this.position + 1 });


function afterSave(doc: IProductCategoryDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.itemGroupCode,
    target: HASHTAG_TYPES.PRODUCTCATEGORY_CODE
  }, {})
    .then(() => {
      next()
    })
}
productCategorySchema.post("save", afterSave);
productCategorySchema.post("findOneAndUpdate", afterSave);
productCategorySchema.post("updateOne", afterSave);

productCategorySchema.plugin(toJSONPlugin);
productCategorySchema.plugin(paginatePlugin);

productCategorySchema.index({ companyId: 1, itemGroupCode: 1 }, { unique: true });
/**
 * @typedef ProductCateroty
 */
export const ProductCategoryModel = mongoose.model<IProductCategoryDoc, IProductCategoryModel>(TABLE_CORE_PRODUCT_CATEGORY, productCategorySchema);