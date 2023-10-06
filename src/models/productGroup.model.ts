import { TABLE_COMPANY, TABLE_CORE_PRODUCT_GROUP, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IProductGroupDoc, IS_PUBLIC, TYPES_OF_LABEL } from "../types";
import { hashtagService } from "../services/hashtag.service";
mongoose.Promise = require('bluebird');
type IProductGroupModel = IModel<IProductGroupDoc>

const productGroupSchema = new mongoose.Schema<IProductGroupDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    position: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    itemGroupCode: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: String,
      enum: IS_PUBLIC,
      default: IS_PUBLIC.PUBLIC
    },
    typeLabel: {
      type: String,
      enum: TYPES_OF_LABEL,
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
productGroupSchema.virtual('no')
  .get(function () { return this.position + 1 });


function afterSave(doc: IProductGroupDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.itemGroupCode,
    target: HASHTAG_TYPES.PRODUCTGROUP_CODE
  }, {})
    .then(() => {
      next()
    })
}
productGroupSchema.post("save", afterSave);
productGroupSchema.post("findOneAndUpdate", afterSave);
productGroupSchema.post("updateOne", afterSave);

productGroupSchema.plugin(toJSONPlugin);
productGroupSchema.plugin(paginatePlugin);

productGroupSchema.index({ companyId: 1, itemGroupCode: 1 }, { unique: true });
/**
 * @typedef ProductGroup
 */
export const ProductGroupModel = mongoose.model<IProductGroupDoc, IProductGroupModel>(TABLE_CORE_PRODUCT_GROUP, productGroupSchema);