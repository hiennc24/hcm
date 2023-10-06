import { TABLE_USER, TABLE_COMPANY, TABLE_CORE_MANDATES, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IMandatesDoc } from "../types";
mongoose.Promise = require('bluebird');

type IMandatesModel = IModel<IMandatesDoc>

const mandatesSchema = new mongoose.Schema<IMandatesDoc>(
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
    mandateKey: {
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

mandatesSchema.plugin(toJSONPlugin);
mandatesSchema.plugin(paginatePlugin);

export const MandatesModel = mongoose.model<IMandatesDoc, IMandatesModel>(TABLE_CORE_MANDATES, mandatesSchema);