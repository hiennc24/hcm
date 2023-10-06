import { SalaryConfigModel } from "../models/salaryConfig.model";
import { ISalaryConfigDoc } from "../types";

const createSalaryConfig = async (body: any): Promise<ISalaryConfigDoc | null> => {
  return SalaryConfigModel.create(body);
};

const getConfigByCompanyId = async (companyId: any): Promise<ISalaryConfigDoc | null> => {
  return SalaryConfigModel.findOne({
    companyId: companyId
  });
};

const updateSalaryConfig = async (companyId: string, body: any): Promise<ISalaryConfigDoc | null> => {
  console.log("bodybody", body)
  return SalaryConfigModel.findOneAndUpdate({
    companyId
  }, body, { new: true });
};

export const salaryConfigService = {
  getConfigByCompanyId,
  createSalaryConfig,
  updateSalaryConfig,
}
