import { BusinessCategoryModel } from "../models/businessCategory.model";
import { IBusinessCategoryDoc } from "../types";

const getList = async (filter: { [x: string]: any }, option?: any): Promise<any> => {
  return BusinessCategoryModel.paginate(filter, option);
};

const getAll = async (filter: { [x: string]: any }): Promise<IBusinessCategoryDoc[]> => {
  return BusinessCategoryModel.find(filter);
};

export const businessCategoryService = {
  getList,
  getAll,
}
