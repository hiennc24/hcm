import { TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_CORE_MASTERPROCESS, TABLE_CORE_PERSONNEL_POSITION, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IMasterProcessDoc, PROCESS_TYPES } from "../types";
import { departmentPopulateFields, personnelPositionFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');
import moment from 'moment';
import { FormatDate } from "../config";

type IMasterProcessModel = IModel<IMasterProcessDoc>

const masterProcessSchema = new mongoose.Schema<IMasterProcessDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_MASTERPROCESS,
      required: false,
    },
    processType: {
      type: String,
      enum: PROCESS_TYPES,
      default: PROCESS_TYPES.MPROJECT
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
      required: false,
    },
    personnelPositionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: false,
    },

    startAt: {
      type: String,
      required: false,
    },
    endAt: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          if (!!this.startAt) {
            const now = moment(this.startAt, FormatDate);
            const end = moment(v, FormatDate); // another date
            const duration = moment.duration(end.diff(now));
            const days = duration.asDays();

            return days >= 0;
          }
          return true;
        },
        message: props => `${props.value} is invalid!`
      },
    },

    procedure: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
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
masterProcessSchema.virtual('childrens', {
  ref: TABLE_CORE_MASTERPROCESS,
  localField: '_id',
  foreignField: 'parentId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});
masterProcessSchema.virtual('department', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});
masterProcessSchema.virtual('personnelPosition', {
  ref: TABLE_CORE_PERSONNEL_POSITION,
  localField: 'personnelPositionId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});
masterProcessSchema.virtual('duration')
  .get(function () {
    const now = moment(this.startAt, FormatDate);
    const end = moment(this.endAt, FormatDate); // another date
    const duration = moment.duration(end.diff(now));
    // console.log(duration);
    //Get Days and subtract from duration
    const days = duration.asDays();
    // console.log("Days: ", days);

    return days;
  })

const populateArr = [
  {
    path: 'department',
    select: departmentPopulateFields,
    options: { skipPopulateChildrens: true, skipPopulateParent: true }
  },
  { path: 'personnelPosition', select: personnelPositionFields },
  {
    path: 'childrens',
    select: personnelPositionFields
  },
];

function afterSave(doc: IMasterProcessDoc, next: any) {
  doc
    .populate(populateArr)
    .finally(() => {
      next()
    })
}
masterProcessSchema.post("save", afterSave);
masterProcessSchema.post("findOneAndUpdate", afterSave);
masterProcessSchema.post("updateOne", afterSave);

function preFind(next: any) {
  this.populate(populateArr)
  next()
}
masterProcessSchema.pre("findOne", preFind);
masterProcessSchema.pre('find', preFind);

masterProcessSchema.plugin(toJSONPlugin);
masterProcessSchema.plugin(paginatePlugin);

// TODO: khi bị xoá, update các tiêu chí con cũng phải bị xoá theo 

/**
 * @typedef MasterProcess
 */
export const MasterProcessModel = mongoose.model<IMasterProcessDoc, IMasterProcessModel>(
  TABLE_CORE_MASTERPROCESS,
  masterProcessSchema
);