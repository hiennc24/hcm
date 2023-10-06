import mongoose from 'mongoose';
import { TABLE_COMPANY } from '../config/table';
import { ICompanyDoc } from '../types';
import { toJSONPlugin } from './plugins';
mongoose.Promise = require('bluebird');

interface CompanyModelDoc extends ICompanyDoc, mongoose.Document { }
type CompanyModelInterface = mongoose.Model<CompanyModelDoc>

const companySchema = new mongoose.Schema<CompanyModelDoc>({
  tenancyId: String, //2
  tenancyName: String, //Biso24,
  name: String, //Công ty thương mại,
  isActive: {
    type: Boolean, default: true
  },//true,
  // creationTime: Date, //2021-08-22T10:45:04.371498,
  // editionDisplayName: String, // Standard,
  // connectionString: null,
  // subscriptionEndDateUtc: null,
  // editionId: string, //1,
  // isInTrialPeriod: false,

  salaryConfigs: {
    useStartingSalary: Boolean,
    regionBased: {
      type: [{
        provinceId: mongoose.Schema.Types.ObjectId,
        districtId: mongoose.Schema.Types.ObjectId,
        minimum: Number,
        applyTo: String,
      }],
      default: []
    },
  },
  insurances: {
    socialInsurance: {
      companyPaid: {
        type: Number, default: 30
      },
      employeePaid: {
        type: Number, default: 10
      },
    },
    healthInsurance: {
      companyPaid: {
        type: Number, default: 30
      },
      employeePaid: {
        type: Number, default: 10
      },
    },
    unemploymentInsurance: {
      companyPaid: {
        type: Number, default: 30
      },
      employeePaid: {
        type: Number, default: 10
      },
    },
    accidentInsurance: {
      companyPaid: {
        type: Number, default: 30
      },
      employeePaid: {
        type: Number, default: 10
      },
    },
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });
// add plugin that converts mongoose to json
companySchema.plugin(toJSONPlugin);

companySchema.virtual('insurances.socialInsurance.total')
  .get(function () {
    return this.insurances.socialInsurance.companyPaid
      + this.insurances.socialInsurance.employeePaid
  })

companySchema.virtual('insurances.healthInsurance.total')
  .get(function () {
    return this.insurances.healthInsurance.companyPaid
      + this.insurances.healthInsurance.employeePaid
  })

companySchema.virtual('insurances.unemploymentInsurance.total')
  .get(function () {
    return this.insurances.unemploymentInsurance.companyPaid
      + this.insurances.unemploymentInsurance.employeePaid
  })

companySchema.virtual('insurances.accidentInsurance.total')
  .get(function () {
    return this.insurances.accidentInsurance.companyPaid
      + this.insurances.accidentInsurance.employeePaid
  })

const CompanyModel = mongoose.model<CompanyModelDoc, CompanyModelInterface>(TABLE_COMPANY, companySchema)
export { CompanyModel, CompanyModelDoc }
