import * as mongoose from 'mongoose';
import { BSC_TARGET_ACTION, BSC_CATEGORY_TYPE, IS_PUBLIC, PROCESS_TYPES, SYSTEM_FIELD_TYPES, TYPES_OF_EMPLOYMENT, TYPES_OF_FILE } from './enumTypes';
import { IDoc } from './entityTypes';
import { FIELD_MODULE } from './enumTypes';

export interface IAccessTokenDoc extends IDoc {
  user: mongoose.ObjectId,
  token: string;
  multitenantToken: string;
  expiredAt: Date,
  // encryptedAccessToken: String,
  refreshToken: string,
  refreshTokenExpireInSeconds: number,
  // createAt: Date;
  // expiredAt: Date;

  userInfo: IUserDoc
}

export interface IUserDoc extends IDoc {
  userId: string,//1
  company: mongoose.ObjectId, //2
  name: string,//admin,
  surname: string,//admin,
  userName: string,//admin,
  emailAddress: string,//admin@aspnetzero.com,
  phoneNumber: string | null,//null,
  profilePictureId: string | null,//null,
  isActive: boolean,//true,
  creationTime: Date,//2021-07-24T17:53:09.752915,

  departmentId: mongoose.ObjectId, //2
  title: string,
}

export interface ICompanyDoc extends mongoose.Document {
  tenancyId: string,
  tenancyName: string,
  name: string,
  isActive: boolean,
  creationTime: Date,
  // editionDisplayName: string,
  // connectionString: string,
  // subscriptionEndDateUtc: Date,
  // editionId: number,
  // isInTrialPeriod: boolean,

  salaryConfigs: {
    useStartingSalary: boolean,
    regionBased: {
      provinceId: mongoose.ObjectId,
      districtId: mongoose.ObjectId,
      minimum: number,
      applyTo: string,
    }[]
  },
  insurances: {
    socialInsurance: {
      companyPaid: number,
      employeePaid: number,
    },
    healthInsurance: {
      companyPaid: number,
      employeePaid: number,
    },
    unemploymentInsurance: {
      companyPaid: number,
      employeePaid: number,
    },
    accidentInsurance: {
      companyPaid: number,
      employeePaid: number,
    },
  }
}

export interface IAccessTokenDoc extends IDoc {
  user: mongoose.ObjectId, //2
  token: string;
  multitenantToken: string;
  expiredAt: Date,
  // encryptedAccessToken: String,
  refreshToken: string,
  refreshTokenExpireInSeconds: number,
  // createAt: Date;
  // expiredAt: Date;
}

export interface BearTokenType {
  user: IUserDoc,
  accesstoken: string
}

export interface GlobalUserInfo {
  _id: string
  user: {
    _id: string
    company: {
      isActive: true
      _id: string
      tenancyId: string //5,
      tenancyName: string //theanh2,
      name: string //"the anh 2",
    }
  }
}

export interface ISystemFieldDoc extends IDoc {
  module: FIELD_MODULE;
  entityId: mongoose.ObjectId; //2

  fieldKey: string, //vd: text_001 ==>  ${type}_num
  fieldName: string,
  fieldType: SYSTEM_FIELD_TYPES,

  defaultValue: any,

  // options: {
  //   text: string, //"Open",
  //   value: string, //"option_1",
  //   color?: string, //"#ff249d"
  //   // isDone?: string,
  //   // isReview: { type: Boolean, default: false },
  // }[],
  // options_inc: number,

  // validations?: {
  //   isRequired: boolean,
  // }
}

export interface IAttachmentDoc extends IDoc {
  filePath: string,
  fileName: string,
  fileType: TYPES_OF_FILE,
}

export interface IPersonnelPositionDoc extends IDoc {
  departmentId: mongoose.ObjectId,

  positionKey: string,
  name: string,
  typesOfEmployment?: TYPES_OF_EMPLOYMENT;
  level: string,
  // forecast?: number,
  amplitude?: number,

  attachments?: mongoose.ObjectId[],
}

export interface IBusinessCategoryDoc {
  name: string,
}

export interface IBusinessSectorDoc {
  name: string,
  businessCategoryId: mongoose.ObjectId,
}
export interface ICategoryBscDoc extends IDoc {
  companyId: mongoose.ObjectId,
  bscCategoryKey: BSC_CATEGORY_TYPE,
  icon: string,
  backgroundColor: string,
  title: string,
  description: string,
  position: number,
  // bscTargetId:mongoose.ObjectId,
}

export interface ITargetBscDoc extends IDoc {
  name: string,
  companyId: mongoose.ObjectId,
  // bscType: string,
  bscCategoryKey: BSC_CATEGORY_TYPE,

  unit: string,
  classify: string,
  period: string,
  value: number,
  action: BSC_TARGET_ACTION,
  quarterly_average: string,
  monthly_average: string,
  measurement_methods: string,
  measuring_frequency: string,
  splitUpKey: mongoose.ObjectId,
}

export interface IHashtagBscDoc extends IDoc {
  name: string,
  bscType: string,
  unit: string,
  classify: string,
  period: string,
}

export interface IUnitBscDoc extends IDoc {
  name: string,
  bscType: string,
}

export interface IClassifyBscDoc extends IDoc {
  name: string,
  bscType: string,
}

export interface IPeriodBscDoc extends IDoc {
  name: string,
  bscType: string,
}

export interface IcategorySpendingDoc extends IDoc { //danh mục chi phí
  companyId: mongoose.ObjectId,
  name: string,
  expenseListCode: string,
  Classify: string,
  key: string,
  parentId: mongoose.ObjectId,
  processType: PROCESS_TYPES,
  position: number,
  level: string,
  note: string,
  cashItem: string,
  accountingCode: string,
  requestProfile: string,
  isPublic: IS_PUBLIC,
}
export interface IExpenseListDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  expenseListCode: string,
  name: string,
  key: string,
  categorySpendingId: mongoose.ObjectId,
  Classify: string,
  level: string,
  note: string,
  cashItem: string,
  accountingCode: string,
  requestProfile: string,
  processType: PROCESS_TYPES,
}

export interface IcategoryCashFlowDoc extends IDoc {
  companyId: mongoose.ObjectId,
  key: string,
  name: string,
  Classify: string,
  parentId: mongoose.ObjectId,
  processType: PROCESS_TYPES,
  position: number,
  cashFlowCode: string,
  requestProfile: string,
  note: string,
  level: string,
  isPublic: IS_PUBLIC,
}
export interface IcashFlowDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  cashFlowCode: string,
  key: string,
  name: string,
  categoryCashFlowId: mongoose.ObjectId,
  requestProfile: string,
  note: string,
  level: string,
  Classify: string,
  processType: PROCESS_TYPES,
}

export interface IadministrationListDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  key: string,
  name: string,
  status: string,
  isSystem: boolean,
  relateModule: string,
  isPublic: IS_PUBLIC,
}

export interface IcustomCategoryDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  key: string,
  categoryCode: string,
  name: string,
  managerId: mongoose.ObjectId,
  note: string,
  isPublic: IS_PUBLIC,
}