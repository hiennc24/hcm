import { TABLE_BUSINESS_CATEGORY, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IBusinessCategoryDoc } from "../types";
mongoose.Promise = require('bluebird');

type IBusinessCategoryModel = IModel<IBusinessCategoryDoc>

const businessCategorySchema = new mongoose.Schema<IBusinessCategoryDoc>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

businessCategorySchema.index({ name: 'text' })

businessCategorySchema.plugin(toJSONPlugin);
businessCategorySchema.plugin(paginatePlugin);

/**
 * @typedef BusinessCategory
 */
export const BusinessCategoryModel = mongoose.model<IBusinessCategoryDoc, IBusinessCategoryModel>(
  TABLE_BUSINESS_CATEGORY,
  businessCategorySchema
);