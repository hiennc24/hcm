import { TABLE_CORE_BUSINESS_PROCESS, TABLE_CORE_SEGMENT, TABLE_CORE_VALUE_CHANGE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ISegmentDoc,LIST_COLOR } from "../types";
mongoose.Promise = require('bluebird');

type ISegmentModel = IModel<ISegmentDoc>

const segmentSchema = new mongoose.Schema<ISegmentDoc>(
  {
    valueChainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_VALUE_CHANGE,
      required: true,
    },
    businessProcessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_BUSINESS_PROCESS,
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

segmentSchema.plugin(toJSONPlugin);
segmentSchema.plugin(paginatePlugin);

function preFind() {
  this.setOptions({
    sort: { position: 1 }
  })
}
segmentSchema.pre('find', preFind);

/**
 * @typedef Segment
 */
export const SegmentModel = mongoose.model<ISegmentDoc, ISegmentModel>(TABLE_CORE_SEGMENT, segmentSchema);