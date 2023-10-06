import { TABLE_COMPANY, TABLE_SALARY_CONFIG, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ICoreConfigDoc, ORGANIZATIONAL_MODAL } from "../types";
mongoose.Promise = require('bluebird');

type ICoreConfigModel = IModel<ICoreConfigDoc>

const coreConfigSchema = new mongoose.Schema<ICoreConfigDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
      index: { unique: true }
    },
    organizationalModel: {
      type: String,
      enum: ORGANIZATIONAL_MODAL,
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

coreConfigSchema.plugin(toJSONPlugin);
coreConfigSchema.plugin(paginatePlugin);

/**
 * @typedef CoreConfig
 */
export const CoreConfigModel = mongoose.model<ICoreConfigDoc, ICoreConfigModel>(TABLE_SALARY_CONFIG, coreConfigSchema);