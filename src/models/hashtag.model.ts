import { TABLE_COMPANY, TABLE_HASHTAG, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IHashtagDoc, HASHTAG_TYPES } from "../types";
mongoose.Promise = require('bluebird');

type IHashtagModel = IModel<IHashtagDoc>

const hashtagSchema = new mongoose.Schema<IHashtagDoc>(
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
    target: {
      type: String,
      enum: HASHTAG_TYPES,
      required: true,
    },
  }
);

hashtagSchema.plugin(toJSONPlugin);
hashtagSchema.plugin(paginatePlugin);

/**
 * @typedef Hashtag
 */
export const HashtagModel = mongoose.model<IHashtagDoc, IHashtagModel>(TABLE_HASHTAG, hashtagSchema);