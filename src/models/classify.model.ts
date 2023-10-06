import mongoose, { Model } from "mongoose";
import { TABLE_CLASSIFY_BSC,TABLE_USER } from "../config/table";
import { IClassifyBscDoc, IModel } from "../types";
import { toJSONPlugin } from "./plugins";


export type IClassifyBscModel = IModel<IClassifyBscDoc>
const classifyBscSchema = new mongoose.Schema<IClassifyBscDoc, Model<IClassifyBscDoc>>({
  name: {
    type: String,
  },
  bscType: {
    type: String,
    require: true,
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
classifyBscSchema.plugin(toJSONPlugin);

export const ClassifyBscModel = mongoose.model<IClassifyBscDoc, IClassifyBscModel>(TABLE_CLASSIFY_BSC, classifyBscSchema);
