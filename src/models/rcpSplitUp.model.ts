/* eslint-disable @typescript-eslint/no-this-alias */
import { TABLE_COMPANY, TABLE_CORE_RCP, TABLE_CORE_RCP_SPLITUP, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { BSC_ENTIRY_ON_MODEL, IModel, IRCPSplitUpDoc, MONTH_KEY, SPLITUP_ON_MODEL } from "../types";
mongoose.Promise = require('bluebird');
import { paginatePlugin, toJSONPlugin } from "./plugins";

type IRCPSplitUpModel = IModel<IRCPSplitUpDoc>
// FM01
const rcpSplitUpSchema = new mongoose.Schema<IRCPSplitUpDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    rcpId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_RCP,
      required: true,
    },

    splitUpKey: {
      type: String,
      required: true,
      enum: BSC_ENTIRY_ON_MODEL
    },
    splitUpId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
      // will look at the `onModel` property to find the right model.
      refPath: 'splitUpModel'
    },
    splitUpModel: {
      type: String,
      required: false,
      enum: SPLITUP_ON_MODEL
    },
    splitByMonth: {
      type: String,
      required: false,
      enum: MONTH_KEY
    },

    // giá trị
    value: {
      type: Number,
      required: true,
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

rcpSplitUpSchema.plugin(toJSONPlugin);
rcpSplitUpSchema.plugin(paginatePlugin);
rcpSplitUpSchema.plugin(toJSONPlugin);

rcpSplitUpSchema.virtual('splitUpTarget', {
  ref: function () { return this.splitUpModel; },
  localField: 'splitUpId',
  foreignField: '_id',
  justOne: true
});

const populateArr = [
  { path: 'splitUpTarget' },
];
function populates() {
  this.populate(populateArr)
}
rcpSplitUpSchema.pre("findOne", populates);
rcpSplitUpSchema.pre('find', populates);

/**
 * @typedef RCPSplitUp
 */
export const RCPSplitUpModel = mongoose.model<IRCPSplitUpDoc, IRCPSplitUpModel>(TABLE_CORE_RCP_SPLITUP, rcpSplitUpSchema);