import { TABLE_CORE_ACCOUNTABILITY, TABLE_CORE_BUSINESS_PROCESS, TABLE_CORE_DEPARTMENT, TABLE_CORE_DUTY, TABLE_CORE_MANDATES, TABLE_CORE_PERSONNEL_POSITION, TABLE_CORE_SEGMENT, TABLE_CORE_VALUE_CHANGE, TABLE_CORE_WORKINSEGMENT, TABLE_SYSTEM_ATTACHMENT, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IAccountabilityDoc, MANDATE_KEY } from "../types";
import { departmentPopulateFields, dutyPopulateField, missionPopulateField, personelPositionlPopulateField } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');

type IAccountabilityModel = IModel<IAccountabilityDoc>

// chi tiết chức năng nhiệm vụ
const accountabilitySchema = new mongoose.Schema<IAccountabilityDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    dutyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DUTY,
      required: true,
    },
    departmentId: { // Bộ phận chuyên trách
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
      require: true,
    },
    mandates: [
      {
        personnelPositionId: { // Nhân sự
          type: mongoose.Schema.Types.ObjectId,
          ref: TABLE_CORE_PERSONNEL_POSITION,
          required: true,
        },
        mandateKey: { // Nhiệm vụ
          type: [
            {
              type: String,
              enum: MANDATE_KEY,
              required: true,
            }
          ]
        }
      }
    ],
    work: {
      valueChainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_CORE_VALUE_CHANGE,
        required: false,
      },
      businessProcessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_CORE_BUSINESS_PROCESS,
        required: false,
      },
      segmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_CORE_SEGMENT,
        required: false,
      },
      workIds: {
        type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: TABLE_CORE_WORKINSEGMENT,
          required: true,
        }],
        default: [],
      },
    },

    attachments: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: TABLE_CORE_WORKINSEGMENT,
        require: true,
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

accountabilitySchema.plugin(toJSONPlugin);
accountabilitySchema.plugin(paginatePlugin);

accountabilitySchema.virtual('duty', {
  ref: TABLE_CORE_DUTY,
  localField: 'dutyId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});
accountabilitySchema.virtual('department', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

accountabilitySchema.virtual('mandatesList.personnelPosition', {
  ref: TABLE_CORE_PERSONNEL_POSITION,
  localField: 'mandates.personnelPositionId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

accountabilitySchema.virtual('mandatesList.mandateKey', {
  ref: TABLE_CORE_MANDATES,
  localField: 'mandates.mandateKey',
  foreignField: 'mandateKey',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'department',
    select: departmentPopulateFields,
    options: {
      skipPopulateChildrens: true,
      skipPopulateParent: true,
      skipPersonnelPositions: true
    }
  },
  {
    path: 'duty',
    select: dutyPopulateField,
  },
  {
    path: 'mandatesList.personnelPosition',
    select: personelPositionlPopulateField,
  },
  {
    path: 'mandatesList.mandateKey',
    select: missionPopulateField,
  },
];
function preFind(next: any) {
  const { skipPopulateDuty } = this.getOptions();
  if (!!skipPopulateDuty) {
    this.populate(populateArr.filter(pop => pop.path !== "duty"))
  } else {
    this.populate(populateArr)
  }

  next()
}

accountabilitySchema.pre("findOne", preFind);
accountabilitySchema.pre('find', preFind);

/**
 * @typedef Accountability
 */
export const AccountabilityModel = mongoose.model<IAccountabilityDoc, IAccountabilityModel>(TABLE_CORE_ACCOUNTABILITY, accountabilitySchema);