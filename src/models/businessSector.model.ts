import { TABLE_BUSINESS_SECTOR, TABLE_BUSINESS_CATEGORY, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IBusinessSectorDoc } from "../types";
mongoose.Promise = require('bluebird');

type IBusinessSectorModel = IModel<IBusinessSectorDoc>

const businessSectorSchema = new mongoose.Schema<IBusinessSectorDoc>(
  {
    businessCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_BUSINESS_CATEGORY,
      required: true,
    },

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

businessSectorSchema.index({ name: 'text' })
businessSectorSchema.index({ name: 'text', businessCategoryId: 1 })

businessSectorSchema.plugin(toJSONPlugin);
businessSectorSchema.plugin(paginatePlugin);

/**
 * @typedef BusinessSector
 */
export const BusinessSectorModel = mongoose.model<IBusinessSectorDoc, IBusinessSectorModel>(
  TABLE_BUSINESS_SECTOR,
  businessSectorSchema
);