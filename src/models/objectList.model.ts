import { TABLE_COMPANY, TABLE_CORE_OBJECT_LIST, TABLE_CORE_OBJECT_USER, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IObjectListDoc, IS_PUBLIC } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { objectuserPopulateFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');
type IObjectListSchemaModel = IModel<IObjectListDoc>

const objectListSchema = new mongoose.Schema<IObjectListDoc>(
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
    itemObjectCode: { //Mã đối tượng
      type: String,
      required: true,
    },
    Taxcode: {
      type: Number, // MST
      required: true,
    },
    image: {                // Logo
      type: String,
      required: false,
    },
    name: {  //ten đối tượng
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    }, // phan loai

    mxh: {
      type: String,
      required: false,
    },// zalo(FB)
    phone: {
      type: Number,
      require: false,
    },//sdt
    email: {
      type: String,
      required: false,
    },//mail
    web: {
      type: String,
      required: false,
    },//website
    address: {
      type: String,
      required: false,
    },//địa chỉa
    bankAccount: {
      type: Number,
      required: false,
    },//stk ngân hàng
    bankName: {
      type: String,
      required: false,
    },//tên ngân hàng
    representativeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_OBJECT_USER,
      required: false,
    }, // người đại diện
    tradersId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_CORE_OBJECT_USER,
      required: false,
    }],// người giao dịch
    CreditLimit: {
      type: Number,
      required: false,
    },//Hạn mức nợ(tiền)
    CreditAgeLimit: {
      type: String,
      required: false,
    },//Hạn mức nợ(vd: 1 năm..)
    description: { //mô tả
      type: String,
      required: false,
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
objectListSchema.virtual('no')
  .get(function () { return this.position + 1 });


objectListSchema.virtual('representative', {
  ref: TABLE_CORE_OBJECT_USER,
  localField: 'representativeId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

objectListSchema.virtual('traders', {
  ref: TABLE_CORE_OBJECT_USER,
  localField: 'tradersId',
  foreignField: '_id',
  justOne: false,
  match: { deletedById: { $exists: false } },
});


const populateArr = [
  {
    path: 'representative',
    select: objectuserPopulateFields,
  },
  { path: 'traders', select: objectuserPopulateFields },
];

function afterSave(doc: IObjectListDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.itemObjectCode,
    target: HASHTAG_TYPES.OBJECTLIST_CODE
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
objectListSchema.post("save", afterSave);
objectListSchema.post("findOneAndUpdate", afterSave);
objectListSchema.post("updateOne", afterSave);

function preFind(next: any) {
  this.populate(populateArr)
  next()
}
objectListSchema.pre("findOne", preFind);
objectListSchema.pre('find', preFind);


objectListSchema.plugin(toJSONPlugin);
objectListSchema.plugin(paginatePlugin);

objectListSchema.index({ companyId: 1, itemObjectCode: 1 }, { unique: true });



/**
 * @typedef ObjectList
 */
export const ObjectListModel = mongoose.model<IObjectListDoc, IObjectListSchemaModel>(
  TABLE_CORE_OBJECT_LIST,
  objectListSchema
);