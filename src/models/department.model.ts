import { TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_CORE_PERSONNEL_POSITION, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { deepPopulatePlugin, paginatePlugin, toJSONPlugin } from "./plugins";
import { IModel, IDepartmentDoc, LIST_COLOR } from "../types";
import { departmentWithChildFields, personnelPositionFields } from "../config/populateConfigs";
import { SYSTEM_DEPARTMENT_TYPE } from "../modules";
mongoose.Promise = require('bluebird');

type IDepartmentModel = IModel<IDepartmentDoc>

const departmentSchema = new mongoose.Schema<IDepartmentDoc>(
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
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_DEPARTMENT,
      required: false,
    },
    backgroundColor: {
      type: String,
      require: false,
      enum: LIST_COLOR,
    },

    isSystem: {
      type: Boolean,
      default: false
    },
    systemType: {
      type: String,
      required: false,
      enum: SYSTEM_DEPARTMENT_TYPE,
    },
    allowDeletion: { // có cho ẩn hay không
      type: Boolean,
      require: true,
    },
    systemSort: { // có cho ẩn hay không
      type: Number,
      default: 4,
    },

    color: {
      type: String,
      required: false,
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

departmentSchema.plugin(toJSONPlugin);
departmentSchema.plugin(paginatePlugin);
departmentSchema.plugin(deepPopulatePlugin);

departmentSchema.virtual('childrens', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: '_id',
  foreignField: 'parentId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});
departmentSchema.virtual('parent', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: 'parentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});
departmentSchema.virtual('personnelPositions', {
  ref: TABLE_CORE_PERSONNEL_POSITION,
  localField: '_id',
  foreignField: 'departmentId',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

function autoPopulateSubs(next: any) {
  // console.log("autoPopulateSubs", this.getOptions())
  const { skipPopulateChildrens, skipPopulateParent, skipPersonnelPositions } = this.getOptions();

  if (!skipPopulateChildrens) {
    this.populate({
      path: 'childrens',
      select: departmentWithChildFields,
      options: { skipPopulateChildrens, skipPopulateParent, skipPersonnelPositions }
    });
  }
  if (!skipPopulateParent) {
    this.populate({
      path: 'parent',
      select: departmentWithChildFields,
      options: { skipPopulateChildrens, skipPopulateParent, skipPersonnelPositions }
    });
  }
  if (!skipPersonnelPositions) {
    this.populate({
      path: 'personnelPositions',
      select: personnelPositionFields,
    });
  }

  next();
}

departmentSchema
  .pre('findOne', autoPopulateSubs)
  .pre('find', autoPopulateSubs);

/**
 * @typedef Department
 */
export const DepartmentModel = mongoose.model<IDepartmentDoc, IDepartmentModel>(TABLE_CORE_DEPARTMENT, departmentSchema);