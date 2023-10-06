import mongoose, { Model } from "mongoose";
import { TABLE_PERIOD_BSC,TABLE_USER } from "../config/table";
import { IModel, IPeriodBscDoc } from "../types";
import { toJSONPlugin } from "./plugins";


export type IPeriodBscModel = IModel<IPeriodBscDoc>
const periodBscSchema = new mongoose.Schema<IPeriodBscDoc, Model<IPeriodBscDoc>>({
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
periodBscSchema.plugin(toJSONPlugin);

export const PeriodBscModel = mongoose.model<IPeriodBscDoc, IPeriodBscModel>(TABLE_PERIOD_BSC, periodBscSchema);
