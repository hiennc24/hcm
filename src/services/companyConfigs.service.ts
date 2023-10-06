import { CompanyModel, CompanyModelDoc } from "../models";
import { ISURACE_TYPES, SURACE_PAY_TYPES } from "../types";

const setSalaryConfigType = async (companyId: string, useStartingSalary: boolean): Promise<CompanyModelDoc | null> => {
  return CompanyModel.findByIdAndUpdate({
    _id: companyId,
    deletedById: { $exists: false }
  }, {
    "salaryConfigs.useStartingSalary": useStartingSalary
  }, {
    new: true
  });
};

const addRegionConfig = async (companyId: string, regionConfig: object): Promise<CompanyModelDoc | null> => {
  return CompanyModel.findOneAndUpdate({
    _id: companyId,
  }, {
    $push: {
      "salaryConfigs.regionBased": regionConfig
    }
  }, {
    new: true
  });
};

const updateRegionConfig = async (companyId: string, regionId: string, body: any): Promise<CompanyModelDoc | null> => {
  const { provinceId, districtId, minimum, applyTo } = body;
  return CompanyModel.findOneAndUpdate({
    _id: companyId,
    "salaryConfigs.regionBased._id": regionId
  }, {
    ...!!districtId ? { "salaryConfigs.regionBased.$.districtId": districtId } : {},
    ...!!provinceId ? {
      "salaryConfigs.regionBased.$.provinceId": provinceId,
      $unset: { "salaryConfigs.regionBased.$.districtId": 1 },
    } : {},
    ...!!minimum ? { "salaryConfigs.regionBased.$.minimum": minimum } : {},
    ...!!applyTo ? { "salaryConfigs.regionBased.$.applyTo": applyTo } : {},
  }, {
    new: true
  });
};

const deleteRegionConfig = async (companyId: string, regionId: string): Promise<CompanyModelDoc | null> => {
  return CompanyModel.findOneAndUpdate({
    _id: companyId,
    "salaryConfigs.regionBased": {
      _id: regionId
    }
  }, {
    $pull: {
      "salaryConfigs.regionBased": {
        _id: regionId
      }
    }
  }, {
    new: true
  });
};

const getInsurances = async (companyId: string, regionId: string): Promise<CompanyModelDoc | null> => {
  return CompanyModel.findOneAndUpdate({
    _id: companyId,
    "salaryConfigs.regionBased": {
      _id: regionId
    }
  }, {
    $pull: {
      "salaryConfigs.regionBased": {
        _id: regionId
      }
    }
  }, {
    new: true
  });
};

const updateInsurance = async (
  companyId: string,
  isuraceType: ISURACE_TYPES,
  payType: SURACE_PAY_TYPES,
  percent: number,
): Promise<CompanyModelDoc | null> => {
  return CompanyModel.findOneAndUpdate({
    _id: companyId,
    deletedById: { $exists: false }
  }, {
    [`insurances.${isuraceType}.${payType}`]: percent
  }, {
    new: true
  })
};

export const companyConfigsService = {
  setSalaryConfigType,
  addRegionConfig,
  updateRegionConfig,
  deleteRegionConfig,
  getInsurances,
  updateInsurance,
}
