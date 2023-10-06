import mongoose, { Model } from "mongoose";
import { TABLE_HASHTAG_BSC,TABLE_USER } from "../config/table";
import { IHashtagBscDoc, IModel } from "../types";
import { toJSONPlugin } from "./plugins";


export type IHashtagBscModel = IModel<IHashtagBscDoc>
const hashtagBscSchema = new mongoose.Schema<IHashtagBscDoc, Model<IHashtagBscDoc>>({
  name: {
    type: String,
  },
  bscType: {
    type: String,
    required: true
  },
  unit: { // Đơn vị
    type: String,
  },
  classify: { // thuộc tính
    type: String,
  },
  period: { // Kỳ đo
    type: String,
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
})

// add plugin that converts mongoose to json
hashtagBscSchema.plugin(toJSONPlugin);

export const HashtagBscModel = mongoose.model<IHashtagBscDoc, IHashtagBscModel>(TABLE_HASHTAG_BSC, hashtagBscSchema);
