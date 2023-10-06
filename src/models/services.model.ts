import { TABLE_COMPANY, TABLE_CORE_SERVICES, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IServicesDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { number } from "joi";
mongoose.Promise = require('bluebird');
type IServicesModel = IModel<IServicesDoc>

const servicesSchema = new mongoose.Schema<IServicesDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    name: {  //ten sp
      type: String,
      required: false,
    },
    position: { //stt
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    itemGroupCode: { //mssp
      type: String,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    importPrice: {
      type: Number,
      require: false,
    },
    sellingPrice: {
      type: Number,
      require: false,
    },
    tax: {
      type: Number,
      require: false,
    },
    isPublic: {
      type: String,
      enum: IS_PUBLIC,
      default: IS_PUBLIC.PUBLIC
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
servicesSchema.virtual('no')
  .get(function () { return this.position + 1 });


function afterSave(doc: IServicesDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.itemGroupCode,
    target: HASHTAG_TYPES.SERVICES_CODE
  }, {})
    .then(() => {
      next()
    })
}
servicesSchema.post("save", afterSave);
servicesSchema.post("findOneAndUpdate", afterSave);
servicesSchema.post("updateOne", afterSave);

servicesSchema.plugin(toJSONPlugin);
servicesSchema.plugin(paginatePlugin);

servicesSchema.index({ companyId: 1, itemGroupCode: 1 }, { unique: true });
/**
 * @typedef Services
 */
export const ServicesModel = mongoose.model<IServicesDoc, IServicesModel>(TABLE_CORE_SERVICES, servicesSchema);