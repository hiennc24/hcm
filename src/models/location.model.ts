import mongoose from 'mongoose';
import { TABLE_LOCATION } from '../config/table';
import { ILocationDoc, LOCATION_TYPES } from '../types';

export interface ILocationModelDoc extends ILocationDoc, mongoose.Document { }
interface ILocationModel extends mongoose.Model<ILocationModelDoc> {
  toJSON: any;
  paginate: any;
}

const locationSchema = new mongoose.Schema<ILocationModelDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: LOCATION_TYPES,
      require: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_LOCATION,
      require: false,
    },
    minWage: {
      type: Number,
      require: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

locationSchema.index({ name: 'text' });

/**
 * @typedef Location
 */
export const LocationModel = mongoose.model<ILocationModelDoc, ILocationModel>(
  TABLE_LOCATION,
  locationSchema
);
