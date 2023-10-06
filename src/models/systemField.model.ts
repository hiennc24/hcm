import { TABLE_SALARY_CONFIG, TABLE_USER, } from "../config/table";
import mongoose, { Schema } from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, ISystemFieldDoc, SALARY_GRADE_TYPES, SYSTEM_FIELD_TYPES } from "../types";
mongoose.Promise = require('bluebird');

type ISystemFieldModel = IModel<ISystemFieldDoc>

const systemFieldSchema = new Schema<ISystemFieldDoc>(
  {
    fieldKey: { type: String, required: true }, //vd: text_001 ==>  ${type}_num
    fieldName: { type: String, required: true },
    fieldType: {
      type: String,
      enum: SYSTEM_FIELD_TYPES,
      default: SYSTEM_FIELD_TYPES.Text
    },

    defaultValue: Schema.Types.Mixed,

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

systemFieldSchema.plugin(toJSONPlugin);
systemFieldSchema.plugin(paginatePlugin);

/**
 * @typedef SystemField
 */
export const SystemFieldModel = mongoose.model<ISystemFieldDoc, ISystemFieldModel>(TABLE_SALARY_CONFIG, systemFieldSchema);