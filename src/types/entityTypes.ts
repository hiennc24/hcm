import * as mongoose from 'mongoose';
import { LOCATION_TYPES, NATUE_OF_COST_TYPES, PROCESS_TYPES, RCP_TYPES, TARGET_FORMULA_ALLOWANCE } from '.';
import { IPersonnelPositionDoc } from './commonEntityTypes';
import {
  BASE_FACTOR_TYPES, BASIC_SALARY_TYPES, HASHTAG_TYPES, BSC_ENTIRY_ON_MODEL,
  IS_PUBLIC, MANDATE_KEY, ORGANIZATIONAL_MODAL, SALARY_GRADE_TYPES, MONTH_KEY, SPLITUP_ON_MODEL, TYPES_OF_LABEL, TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY
} from './enumTypes';

export interface IModel<T> extends mongoose.Model<T> {
  createdById: any,
  createdAt: Date,
  deletedById?: any,
  deletedAt?: Date,
  updatedAt?: Date,

  toJSON: any
  paginate: any,
  aggregatePaginate: any,
  deepPopulate: any,
}

export interface IDoc extends mongoose.Document {
  createdById?: mongoose.ObjectId,
  createdAt: Date,

  updatedById?: mongoose.ObjectId,
  updatedAt?: Date,

  deletedById?: mongoose.ObjectId,
  deletedAt?: Date,

  toJSON: any,
  toObject: any,
  aggregate: any,
  aggregatePaginate: any,
  deepPopulate: any,
}

export interface ISalaryConfigDoc extends IDoc {
  companyId: mongoose.ObjectId,
  name: string,
  salaryGradeType: SALARY_GRADE_TYPES,

  table_configs: {
    column_salarygrade_name: string,
    column_salarygrade_shortname: string,
    column_factor_name: string,
    column_lvt_name: string,
    column_lvt_shortname: string,
    column_lcb_name: string,
    column_lcb_shortname: string,
    column_total_name: string,
    column_total_shortname: string,
    column_description_name: string,
  },
}

export interface ISalaryGradeDoc extends IDoc {
  salaryConfigId: mongoose.ObjectId,

  basicSalaryType: BASIC_SALARY_TYPES, //lương tối thiểu vùng / lương khởi điểm
  basicSalaryValue: number, // giá trị lương cơ sở

  name: string,
  position: number,

  baseFactorType: BASE_FACTOR_TYPES, // vị trí của lương cơ sở : giữa / bắt đầu
  baseFactorValue: number, // hệ số của lương cơ sở
  baseJumpFactor: number;

  percentLcb: number;
  percentKpi: number;

  useBaseJumpFactor: boolean;

  prefixGrade: string, //tiền tố row con
}

export interface ISalaryLevelDoc extends IDoc {
  salaryGradeId: mongoose.ObjectId,
  position: number,
  jumpFactor: number;
  factor: number,
  isBaseFactor: boolean;

  percentLcb: number;
  percentKpi: number;
}

export interface IConfigTableDoc extends IDoc {
  companyId: mongoose.Types.ObjectId,
  tableKey: string,
  configs: [{
    columKey: string,
    length: number,
  }],
}

export interface IPlanSaleDoc extends IDoc {
  companyId: mongoose.Types.ObjectId,
  productGroupId: mongoose.Schema.Types.ObjectId,
  value: number,
}

export interface ISalePlanDetailDoc extends IDoc {
  companyId: mongoose.Types.ObjectId,
  salePlanId: mongoose.Types.ObjectId,
  salePlanModel: string,
}
export interface ICoreConfigDoc extends IDoc {
  companyId: mongoose.ObjectId,
  organizationalModel: ORGANIZATIONAL_MODAL
}
export interface IDepartmentDoc extends IDoc {
  name: string,
  parentId: mongoose.ObjectId,
  backgroundColor: string,
  companyId: mongoose.ObjectId,
  isSystem: boolean,
  systemType: string,
  allowDeletion: boolean,
  systemSort: number,
  color: string;

  //popuplate
  childrens: IDepartmentDoc[],
  personnelPositions: IPersonnelPositionDoc[]
}

export interface IAccountabilityDoc extends IDoc {
  name: mongoose.ObjectId,
  dutyId: mongoose.ObjectId,

  departmentId: mongoose.ObjectId,
  personnelPositionId: mongoose.ObjectId,

  mandates: {
    personnelPositionId: mongoose.ObjectId,
    mandateKey: MANDATE_KEY[],
  }[],

  work: {
    valueChainId: mongoose.ObjectId,
    businessProcessId?: mongoose.ObjectId,
    segmentId?: mongoose.ObjectId,
    workIds: mongoose.ObjectId[],
  }

  attachments?: mongoose.ObjectId[],
}

export interface IAccountSegmentDoc extends IDoc {
  accountabilityId: mongoose.ObjectId,
  workInsegmentIds: any[],
  segmentId: mongoose.ObjectId,
  businessProcessId: mongoose.ObjectId,
}

export interface IDutyDoc extends IDoc {
  name: string,
  companyId: mongoose.ObjectId,
  departmentId: mongoose.ObjectId,
}

export interface IMandatesStoreDoc extends IDoc {
  name: string,
  companyId: mongoose.ObjectId,
}

export interface IMandatesDoc extends IDoc {
  companyId: mongoose.ObjectId,
  name: string,
  mandateKey: BASE_FACTOR_TYPES,
}

export interface IValueChainDoc extends IDoc {
  companyId: mongoose.ObjectId,

  name: string,
  // position: number,
}

export interface IBusinessProcessDoc extends IDoc {
  valueChainId: mongoose.ObjectId,
  backgroundColor: string,
  name: string,
  position: number,
}

export interface ISegmentDoc extends IDoc {
  valueChainId: mongoose.ObjectId,
  businessProcessId: mongoose.ObjectId,
  name: string,
  backgroundColor: string,
  position: number,
}

export interface IWorkInSegmentDoc extends IDoc {
  name: string,
  backgroundColor: string,
  companyId: mongoose.ObjectId,
  segmentId: mongoose.ObjectId,
  departmentId: mongoose.ObjectId,
  position: number,
}

export interface IAllowanceDoc extends IDoc {
  salaryConfigId: mongoose.ObjectId,
  salaryGradeId: mongoose.ObjectId,

  fieldKey: string,

  name: string,
  shortName: string,
  shortNameTemp: string,

  useValueConstant: boolean,
  valueConstant: number,
  valueFormula: {
    argument: TARGET_FORMULA_ALLOWANCE,
    percent: number
  },

  position: number,
}

export interface IRCPValueDoc extends IDoc {
  companyId: mongoose.ObjectId,
  year: string,

  monthly_factor: {
    month_1: number;
    month_2: number;
    month_3: number;
    month_4: number;
    month_5: number;
    month_6: number;
    month_7: number;
    month_8: number;
    month_9: number;
    month_10: number;
    month_11: number;
    month_12: number;
  }

  netRevenue: number,
}

export interface IRCPDoc extends IDoc {
  companyId: mongoose.ObjectId,
  year: number,

  name: string,

  itemType: RCP_TYPES,
  natueCost: NATUE_OF_COST_TYPES, // bien phi / dinh phi

  percent: number, // dành cho biến phí
  value: number, // dành cho định phí

  parentId: mongoose.ObjectId,
}
export interface IRCPSplitUpDoc extends IDoc {
  companyId: mongoose.ObjectId,
  rcpId: mongoose.ObjectId,

  splitUpKey: BSC_ENTIRY_ON_MODEL,
  splitUpModel: SPLITUP_ON_MODEL,
  splitUpId: mongoose.ObjectId,
  splitByMonth: MONTH_KEY,

  value: number, // dành cho định phí
}

export interface IRCPByStageDoc extends IDoc {
  companyId: mongoose.ObjectId,
  rcpId: mongoose.ObjectId,

  stage: number, // 1 || 2 || 3 || 4
  value: number,
}

export interface IRCPByMonthDoc extends IDoc {
  companyId: mongoose.ObjectId,
  rcpId: mongoose.ObjectId,
  stage: number,

  month: number, // 1 => 12
  value: number,
}

export interface IMasterProcessDoc extends IDoc {
  companyId: mongoose.ObjectId,

  parentId: mongoose.ObjectId,
  processType: PROCESS_TYPES,

  departmentId: mongoose.ObjectId,
  personnelPositionId: mongoose.ObjectId,

  startAt: string,
  endAt: string,
  duration: number,

  procedure: string,

  name: string,
}

export interface IProductGroupDoc extends IDoc {
  companyId: mongoose.ObjectId,

  position: number,
  image: string,
  itemGroupCode: string,
  name: string,
  description: string,
  isActive: boolean,
  isPublic: IS_PUBLIC,
  typeLabel: TYPES_OF_LABEL
}

export interface ILocationDoc {
  name: string,
  type: LOCATION_TYPES,
  parent: mongoose.ObjectId,
  minWage: number,
}

export interface IHashtagDoc {
  companyId: mongoose.ObjectId,

  name: string,
  data: any,
  target: HASHTAG_TYPES,
}

export interface IProductCategoryDoc extends IDoc {
  companyId: mongoose.ObjectId,

  position: number,
  image: string,
  itemGroupCode: string,
  name: string,
  unit: string,
  importPrice: number,
  sellingPrice: number,
  tax: number,
  isPublic: IS_PUBLIC,
}
export interface IMaterialsSpareDoc extends IDoc {
  position: number,
  productGroupCode: string,
  companyId: mongoose.ObjectId,
  commodityCode: string,
  image: string,
  name: string,
  unit: string,
  conversionUnit1: {
    name: string,
    rate: number
  },
  conversionUnit2: {
    name: string,
    rate: number
  },
  conversionUnit3: {
    name: string,
    rate: number
  },
  isActive: boolean,

  purchasePrice: number,
  retailPrice: number,
  wholesalePrice: number,
  otherPrice: number,

  tax: number,
  otherTax: number,

  category: string, // phan loai
  quantitative: number, // Định lượng
  grade: string, // Phẩm cấp
  packingSpecification: string,// Quy cách đóng gói,
  origin: string,
  dueDate: string,
  isPublic: IS_PUBLIC,
}
export interface IServicesDoc extends IDoc {
  companyId: mongoose.ObjectId,

  position: number,
  image: string,
  itemGroupCode: string,
  name: string,
  unit: string,
  importPrice: number,
  sellingPrice: number,
  tax: number,
  isPublic: IS_PUBLIC,
}

export interface ICommodityListDoc extends IDoc {
  position: number,
  productGroupCode: string,
  companyId: mongoose.ObjectId,
  commodityCode: string,
  image: string,
  name: string,
  unit: string,
  conversionUnit1: {
    name: string,
    rate: number
  },
  conversionUnit2: {
    name: string,
    rate: number
  },
  conversionUnit3: {
    name: string,
    rate: number
  },
  isActive: boolean,

  purchasePrice: number,
  retailPrice: number,
  wholesalePrice: number,
  otherPrice: number,

  tax: number,
  otherTax: number,

  category: string, // phan loai
  quantitative: number, // Định lượng
  grade: string, // Phẩm cấp
  packingSpecification: string,// Quy cách đóng gói,
  origin: string,
  dueDate: string,
  isPublic: IS_PUBLIC,
}

export interface IObjectListDoc extends IDoc {
  companyId: mongoose.ObjectId,

  position: number,
  itemObjectCode: string,
  Taxcode: number
  image: string,

  name: string,
  category: string,
  mxh: string,
  phone: number,
  email: string,
  web: string,
  address: string,
  bankAccount: number,
  bankName: string,
  representativeId: mongoose.ObjectId,
  tradersId: mongoose.ObjectId,
  CreditLimit: number,
  CreditAgeLimit: string,
  description: string,
  isPublic: IS_PUBLIC,
}
export interface IObjectUserDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  image: string,
  name: string,
  phone: number,
  cccd: number,
  email: string,
  address: string,
  rank: string,
  responsibility: string,

}
export interface IChannelDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  name: string,
  channelCode: string,
  picId: mongoose.ObjectId,
  remarks: string,
}
export interface IBaseUnitDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  name: string,
  baseUnitCode: string,
  picId: mongoose.ObjectId,
  remarks: string,
}
export interface IBscDetailDoc extends IDoc {
  companyId: mongoose.ObjectId,
  bscCategoryKey: mongoose.ObjectId,
  targetId: mongoose.ObjectId,

  position: number,

  splitUpKey: BSC_ENTIRY_ON_MODEL,
  splitUpId: mongoose.ObjectId,
  splitUpModel: SPLITUP_ON_MODEL,
  splitByMonth: MONTH_KEY,

  unit: string,
  manageById: TABLE_CORE_BSC_TARGETDETAIL_MANAGEBY,
  value: number,
  period: string,
  chargeBy: string,
  plan: string,
  note: string,
}

export interface IselectListDoc extends IDoc {
  companyId: mongoose.ObjectId,
  position: number,
  type: string,
  isSystem: boolean,
  title_default: string,
  title_custom: string,
}

export interface IDivergenceDoc {
  companyId: mongoose.ObjectId,
  name: string,
  divergenceKey: MONTH_KEY,
}
