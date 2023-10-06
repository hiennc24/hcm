import { TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_CORE_PERSONNEL_POSITION, TABLE_SYSTEM_ATTACHMENT, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IPersonnelPositionDoc, TYPES_OF_EMPLOYMENT } from "../types";
mongoose.Promise = require('bluebird');

type IPersonnelPositionModel = IModel<IPersonnelPositionDoc>

const personnelPositionSchema = new mongoose.Schema<IPersonnelPositionDoc>(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
      required: true,
    },
    positionKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    amplitude: { //định biên
      type: Number,
      required: false,
    },

    typesOfEmployment: {
      type: String,
      enum: TYPES_OF_EMPLOYMENT,
      required: false,
    },
    attachments: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_SYSTEM_ATTACHMENT,
      }],
      default: [],
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

personnelPositionSchema.plugin(toJSONPlugin);
personnelPositionSchema.plugin(paginatePlugin);

personnelPositionSchema.virtual('forecast')
  .get(function () { return false });

personnelPositionSchema.index(
  { "departmentId": 1, "positionKey": 1 },
  { unique: true }
);
personnelPositionSchema.index(
  { "departmentId": 1, "name": 1 },
  { unique: true }
);

/**
 * @typedef PersonnelPosition
 */
export const PersonnelPositionModel = mongoose.model<IPersonnelPositionDoc, IPersonnelPositionModel>(TABLE_CORE_PERSONNEL_POSITION, personnelPositionSchema);