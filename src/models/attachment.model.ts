import { TABLE_SYSTEM_ATTACHMENT, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IAttachmentDoc, TYPES_OF_FILE } from "../types";
mongoose.Promise = require('bluebird');

type IAttachmentModel = IModel<IAttachmentDoc>

const attachmentSchema = new mongoose.Schema<IAttachmentDoc>(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: false,
    },
    fileType: {
      type: String,
      enum: TYPES_OF_FILE,
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

attachmentSchema.plugin(toJSONPlugin);
attachmentSchema.plugin(paginatePlugin);

/**
 * @typedef Attachment
 */
export const AttachmentModel = mongoose.model<IAttachmentDoc, IAttachmentModel>(TABLE_SYSTEM_ATTACHMENT, attachmentSchema);