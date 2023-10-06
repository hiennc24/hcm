/* eslint-disable @typescript-eslint/no-this-alias */
import { TABLE_COMPANY, TABLE_CORE_RCP, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IRCPDoc, NATUE_OF_COST_TYPES, RCP_TYPES } from "../types";
import { rcpPositionFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IRCPModel = IModel<IRCPDoc>
// FM01
const rcpSchema = new mongoose.Schema<IRCPDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    // khoản mục
    itemType: {
      type: String,
      enum: RCP_TYPES,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    // Phân loại
    natueCost: {
      type: String,
      enum: NATUE_OF_COST_TYPES,
      required: false,
    },
    // % giá trị
    percent: {
      type: Number,
      required: false,
    },
    // giá trị
    value: {
      type: Number,
      required: false,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_RCP,
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

rcpSchema.virtual('childrens', {
  ref: TABLE_CORE_RCP,
  localField: '_id',
  foreignField: 'parentId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

function preSave() {
  console.log("rcpSchema: preSave", this.get("natueCost"))
  const natueCost = this.get("natueCost");
  if (natueCost == NATUE_OF_COST_TYPES.FIEXED_COST) {
    this.update({ percent: null });
  }
  if (natueCost == NATUE_OF_COST_TYPES.VARIABLE_COST) {
    this.update({ value: null });
  }
}
rcpSchema.pre("save", preSave)
rcpSchema.pre("findOneAndUpdate", preSave)
rcpSchema.pre("updateOne", preSave)

function preFind(next: any) {
  this.populate({
    path: 'childrens',
    select: rcpPositionFields,
  });
  return next();
}
rcpSchema
  .pre('findOne', preFind)
  .pre('find', preFind);

rcpSchema.plugin(toJSONPlugin);
rcpSchema.plugin(paginatePlugin);

/**
 * @typedef RCP
 */
export const RCPModel = mongoose.model<IRCPDoc, IRCPModel>(TABLE_CORE_RCP, rcpSchema);