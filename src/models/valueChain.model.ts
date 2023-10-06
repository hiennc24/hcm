import { TABLE_COMPANY, TABLE_CORE_VALUE_CHANGE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IValueChainDoc } from "../types";
mongoose.Promise = require('bluebird');

type IValueChainModel = IModel<IValueChainDoc>

const valueChainSchema = new mongoose.Schema<IValueChainDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    name: {
      type: String,
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

valueChainSchema.plugin(toJSONPlugin);
valueChainSchema.plugin(paginatePlugin);

/**
 * @typedef ValueChain
 */
export const ValueChainModel = mongoose.model<IValueChainDoc, IValueChainModel>(TABLE_CORE_VALUE_CHANGE, valueChainSchema);