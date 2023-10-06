import { TABLE_COMPANY, TABLE_CORE_RCPVALUE, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IRCPValueDoc } from "../types";
mongoose.Promise = require('bluebird');

type IRCPValueModel = IModel<IRCPValueDoc>

const rcpValueSchema = new mongoose.Schema<IRCPValueDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    monthly_factor: {
      month_1: {
        type: Number,
        default: 1
      },
      month_2: {
        type: Number,
        default: 1
      },
      month_3: {
        type: Number,
        default: 1
      },
      month_4: {
        type: Number,
        default: 1
      },
      month_5: {
        type: Number,
        default: 1
      },
      month_6: {
        type: Number,
        default: 1
      },
      month_7: {
        type: Number,
        default: 1
      },
      month_8: {
        type: Number,
        default: 1
      },
      month_9: {
        type: Number,
        default: 1
      },
      month_10: {
        type: Number,
        default: 1
      },
      month_11: {
        type: Number,
        default: 1
      },
      month_12: {
        type: Number,
        default: 1
      },
    },

    netRevenue: {
      type: Number,
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

rcpValueSchema.plugin(toJSONPlugin);
rcpValueSchema.plugin(paginatePlugin);

/**
 * @typedef RCPValue
 */
export const RCPValueModel = mongoose.model<IRCPValueDoc, IRCPValueModel>(TABLE_CORE_RCPVALUE, rcpValueSchema);