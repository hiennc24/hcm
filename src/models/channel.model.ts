import { TABLE_COMPANY, TABLE_CORE_CHANNEL,TABLE_CORE_PERSONNEL_POSITION, TABLE_USER, } from "../config/table";
import mongoose from 'mongoose';
import { paginatePlugin, toJSONPlugin } from "./plugins";
import { HASHTAG_TYPES, IModel, IChannelDoc } from "../types";
import { hashtagService } from "../services/hashtag.service";
import { personnelPositionFields } from "../config/populateConfigs";
mongoose.Promise = require('bluebird');
type IChannelModel = IModel<IChannelDoc>

const channelSchema = new mongoose.Schema<IChannelDoc>(
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
    channelCode: { //mssp
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
channelSchema.virtual('no')
  .get(function () { return this.position + 1 });

  channelSchema.virtual('personnelPositions', {
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



function afterSave(doc: IChannelDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
    name: doc.channelCode,
    target: HASHTAG_TYPES.CHANNEL_CORE
  }, {})
  doc
    .populate(populateArr)
    .then(() => {
      next()
    })
}
channelSchema.post("save", afterSave);
channelSchema.post("findOneAndUpdate", afterSave);
channelSchema.post("updateOne", afterSave);
function preFind(next: any) {
  this.populate(populateArr)
  next()
}
channelSchema.pre("findOne", preFind);
channelSchema.pre('find', preFind);
channelSchema.plugin(toJSONPlugin);
channelSchema.plugin(paginatePlugin);

channelSchema.index({ companyId: 1, channelCode: 1 }, { unique: true });
/**
 * @typedef channel
 */
export const ChannelModel = mongoose.model<IChannelDoc, IChannelModel>(TABLE_CORE_CHANNEL, channelSchema);