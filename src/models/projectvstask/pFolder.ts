import { TABLE_COMPANY, TABLE_CORE_BUSINESS_PROCESS, TABLE_CORE_SEGMENT, TABLE_USER, } from "../../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "../plugins";
import { IModel, IPFolderDoc } from "../../types";
mongoose.Promise = require('bluebird');

type IPFolderModel = IModel<IPFolderDoc>

const pFolder = new mongoose.Schema<IPFolderDoc>(
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

    isSystem: {
      type: Boolean,
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

pFolder.plugin(toJSONPlugin);
pFolder.plugin(paginatePlugin);

/**
 * @typedef PFolder
 */
export const PFolderModel = mongoose.model<IPFolderDoc, IPFolderModel>(TABLE_CORE_SEGMENT, pFolder);