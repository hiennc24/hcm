import mongoose, { Model } from "mongoose";
import { userPopulateFields } from "../config/populateConfigs";
import { TABLE_ACCESSTOKEN, TABLE_USER } from "../config/table";
import { IAccessTokenDoc, IModel } from "../types";
import { toJSONPlugin } from "./plugins";

export type IAccessTokenModel = IModel<IAccessTokenDoc>
const accessTokenSchema = new mongoose.Schema<IAccessTokenDoc, Model<IAccessTokenDoc>>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_USER,
  },
  token: String,
  multitenantToken: String,
  expiredAt: Date,
  // encryptedAccessToken: String,
  refreshToken: String,
  refreshTokenExpireInSeconds: Number,
  // createAt: Date,
  // expiredAt: Date
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
accessTokenSchema.virtual('userInfo', {
  ref: TABLE_USER,
  localField: 'user',
  foreignField: '_id',
  justOne: true
});
// add plugin that converts mongoose to json
accessTokenSchema.plugin(toJSONPlugin);

const populateArr = [
  { path: 'userInfo', select: userPopulateFields },
];
function populates() {
  this.populate(populateArr)
}
accessTokenSchema.pre("findOne", populates);
accessTokenSchema.pre('find', populates);

export const AccessTokenModel = mongoose.model<IAccessTokenDoc, IAccessTokenModel>(TABLE_ACCESSTOKEN, accessTokenSchema);
