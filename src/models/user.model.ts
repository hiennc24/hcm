import mongoose, { Schema } from 'mongoose';
import { departmentPopulateFields } from '../config/populateConfigs';
import { TABLE_COMPANY, TABLE_CORE_DEPARTMENT, TABLE_USER } from '../config/table';
import { IModel, IUserDoc } from '../types';
import { paginatePlugin, toJSONPlugin } from './plugins';
mongoose.Promise = require('bluebird');

// interface UserModelDoc extends IUserDoc, mongoose.Document { }
type UserModelDoc = IModel<IUserDoc>

// 2. Create a Schema corresponding to the document interface.
const userModelSchema = new Schema<IUserDoc>({
  userId: {
    type: String
  },//1
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_COMPANY,
  }, //2
  name: String,//admin,
  surname: String,//admin,
  userName: String,//admin,
  emailAddress: String,//admin@aspnetzero.com,
  phoneNumber: {
    type: String, require: false
  },//null,
  profilePictureId: {
    type: String, require: false
  },//null,
  isActive: {
    type: Boolean, default: true
  },//true,
  // creationTime: Date,//2021-07-24T17:53:09.752915,

  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TABLE_CORE_DEPARTMENT,
  },
  title: String,

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
userModelSchema.virtual('fullName')
  .get(function () {
    return [this.name, this.surname].filter(str => !!str).join(" ")
  })
userModelSchema.virtual('department', {
  ref: TABLE_CORE_DEPARTMENT,
  localField: 'departmentId',
  foreignField: '_id',
  justOne: true,
  match: { deletedById: { $exists: false } },
});

const populateArr = [
  {
    path: 'department', select: departmentPopulateFields,
    options: { skipPopulateChildrens: true, skipPopulateParent: true, skipPersonnelPositions: true }
  },
];

function autoPopulateSubs(next: any) {
  this.populate(populateArr)
  next()
}

function afterSave(doc: IUserDoc, next: any) {
  doc.populate(populateArr)
    .then(() => {
      next()
    })
}

userModelSchema
  .pre('findOne', autoPopulateSubs)
userModelSchema
  .pre('find', autoPopulateSubs);

userModelSchema.post("save", afterSave);
userModelSchema.post("findOneAndUpdate", afterSave);
userModelSchema.post("updateOne", afterSave);

userModelSchema.plugin(paginatePlugin);
userModelSchema.plugin(toJSONPlugin);

const UserModel = mongoose.model<IUserDoc, UserModelDoc>(TABLE_USER, userModelSchema)

export { UserModel, UserModelDoc }
