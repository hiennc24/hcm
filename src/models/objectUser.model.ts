import { TABLE_COMPANY, TABLE_CORE_OBJECT_USER, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IObjectUserDoc } from "../types";
import { hashtagService } from "../services/hashtag.service";
mongoose.Promise = require('bluebird');
type IObjectUserSchemaModel = IModel<IObjectUserDoc>

const objectUserSchema = new mongoose.Schema<IObjectUserDoc>(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_COMPANY,
      required: true,
    },
    position: { //stt
        type: Number,
        required: true,
      },
    image: {     // Logo
        type: String,
        required: false,
      },
    name: {  //ten đối tượng
      type: String,
      required: false,
    },
    phone:{
        type: Number,
        require: false,
      },//sdt
    cccd: {
        type: Number,
        required: true,
    }, // phan loai

    email:{
        type: String,
        required: false,
    },//mail

    address:{
        type: String,
        required: false,
    },//địa chỉa
    rank:{
        type: String,
        required: false,
    },//chức vụ
    responsibility:{
        type: String,
        required: false,
    },//trách nhiệm
  
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
objectUserSchema.virtual('no')
.get(function () { return this.position + 1 });


function afterSave(doc: IObjectUserDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.cccd,
    target: HASHTAG_TYPES.OBJECTUSER_CODE
  }, {})
    .then(() => {
      next()
    })
}
objectUserSchema.post("save", afterSave);
objectUserSchema.post("findOneAndUpdate", afterSave);
objectUserSchema.post("updateOne", afterSave);
objectUserSchema.plugin(toJSONPlugin);
objectUserSchema.plugin(paginatePlugin);

objectUserSchema.index({ companyId: 1,cccd:1 }, { unique: true });

/**
 * @typedef ObjectList
 */
export const ObjectUserModel = mongoose.model<IObjectUserDoc, IObjectUserSchemaModel>(
    TABLE_CORE_OBJECT_USER,
  objectUserSchema
);