import { TABLE_CORE_BUSINESS_PROCESS, TABLE_CORE_SEGMENT, TABLE_CORE_VALUE_CHANGE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IBusinessProcessDoc,LIST_COLOR } from "../types";
import { businessProcessFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IBusinessProcessModel = IModel<IBusinessProcessDoc>

const businessProcessSchema = new mongoose.Schema<IBusinessProcessDoc>(
  {
    valueChainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_VALUE_CHANGE,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      require: false,
      enum: LIST_COLOR,
    },
    position: {
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

businessProcessSchema.virtual('segments', {
  ref: TABLE_CORE_SEGMENT,
  localField: '_id',
  foreignField: 'businessProcessId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

function autoPopulateSubs(next: any) {
  this.populate({
    path: 'segments',
    select: businessProcessFields,
  });

  next();
}

businessProcessSchema
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);

businessProcessSchema.plugin(toJSONPlugin);
businessProcessSchema.plugin(paginatePlugin);

/**
 * @typedef BusinessProcess
 */
export const BusinessProcessModel = mongoose.model<IBusinessProcessDoc, IBusinessProcessModel>(TABLE_CORE_BUSINESS_PROCESS, businessProcessSchema);