import mongoose, { Model } from "mongoose";
import { TABLE_UNIT_BSC,TABLE_USER } from "../config/table";
import { IModel, IUnitBscDoc } from "../types";
import { toJSONPlugin } from "./plugins";


export type IUnitBscModel = IModel<IUnitBscDoc>
const unitBscSchema = new mongoose.Schema<IUnitBscDoc, Model<IUnitBscDoc>>({
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
unitBscSchema.plugin(toJSONPlugin);

export const UnitBscModel = mongoose.model<IUnitBscDoc, IUnitBscModel>(TABLE_UNIT_BSC, unitBscSchema);
