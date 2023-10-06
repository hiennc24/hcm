import { TABLE_COMPANY, TABLE_SYSTEM_DIVERGENCE, } from "../config/table";
import mongoose from 'mongoose';
import { IModel, IDivergenceDoc, MONTH_KEY } from "../types";
mongoose.Promise = require('bluebird');

type IDivergenceModel = IModel<IDivergenceDoc>

const divergenceSchema = new mongoose.Schema<IDivergenceDoc>(
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
    divergenceKey: {
      type: String,
      require: false,
      enum: MONTH_KEY,
    },
  }
);

/**
 * @typedef Divergence
 */
export const DivergenceModel = mongoose.model<IDivergenceDoc, IDivergenceModel>(
  TABLE_SYSTEM_DIVERGENCE,
  divergenceSchema
);