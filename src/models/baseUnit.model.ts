import { TABLE_COMPANY, TABLE_CORE_BASE_UNIT,TABLE_CORE_PERSONNEL_POSITION, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IBaseUnitDoc } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { personnelPositionFields } from "../config/populateConfigs";
import { number, string } from "joi";
mongoose.Promise = require('bluebird');
type IBaseUnitModel = IModel<IBaseUnitDoc>

const baseUnitSchema = new mongoose.Schema<IBaseUnitDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    position: { //stt
      type: Number,
      required: false,
    },
    name: {  //ten sp
        type: String,
        required: false,
    },
    baseUnitCode: { //mssp
        type: String,
        required: false,
    },
    picId: { // sẽ liên kết với người quản lý or chức vụ
        type: mongoose.Schema.Types.ObjectId,
        ref:TABLE_CORE_PERSONNEL_POSITION,
        required: false,
    },
    remarks:{
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
baseUnitSchema.virtual('no')
  .get(function () { return this.position + 1 });

  baseUnitSchema.virtual('personnelPositions', {
  ref: TABLE_CORE_PERSONNEL_POSITION,
  localField: 'picId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
    {
      path: 'personnelPositions',
      select: personnelPositionFields,
    }
  ];



function afterSave(doc: IBaseUnitDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.baseUnitCode,
    target: HASHTAG_TYPES.CHANNEL_CORE
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
baseUnitSchema.post("save", afterSave);
baseUnitSchema.post("findOneAndUpdate", afterSave);
baseUnitSchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
baseUnitSchema.pre("findOne", preFind);
baseUnitSchema.pre('find', preFind);
baseUnitSchema.plugin(toJSONPlugin);
baseUnitSchema.plugin(paginatePlugin);

baseUnitSchema.index({ companyId: 1, baseUnitCode: 1 }, { unique: true });
/**
 * @typedef BaseUnit
 */
export const BaseUnitModel = mongoose.model<IBaseUnitDoc, IBaseUnitModel>(TABLE_CORE_BASE_UNIT, baseUnitSchema);