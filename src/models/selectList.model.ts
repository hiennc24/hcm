import mongoose, { Model } from "mongoose";
import { TABLE_SELECT_LIST,TABLE_USER } from "../config/table";
import { IModel, IselectListDoc } from "../types";
import { toJSONPlugin,paginatePlugin } from "./plugins";
import { hashtagService } from "../services/hashtag.service";

export type ISelectListModel = IModel<IselectListDoc>
const selectListSchema = new mongoose.Schema<IselectListDoc, Model<IselectListDoc>>({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    position: { //stt
      type: Number,
      required: true,
    },
    type: {
        type: String,
        required: false,
    },
    isSystem: {
        type: Boolean,
        default: false,
    },
    title_default: {
        type: String,
        required: false,
    },
    title_custom: {
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
  })

selectListSchema.virtual('no')
.get(function () { return this.position + 1 });


selectListSchema.virtual('title')
.get(function () { return this.title_custom||this.title_default });

function afterSave(doc: IselectListDoc, next: any) {
  hashtagService.createOrUpdate({
    companyId: doc.companyId,
  }, {})
    .then(() => {
      next()
    })
}
selectListSchema.post("save", afterSave);
selectListSchema.post("findOneAndUpdate", afterSave);
selectListSchema.post("updateOne", afterSave);

selectListSchema.plugin(toJSONPlugin);
selectListSchema.plugin(paginatePlugin);
// add plugin that converts mongoose to json
selectListSchema.plugin(toJSONPlugin);
// selectListSchema.index({ companyId: 1, splitUpKey: 1 }, { unique: true });
export const SelectListModel = mongoose.model<IselectListDoc, ISelectListModel>(TABLE_SELECT_LIST, selectListSchema);
