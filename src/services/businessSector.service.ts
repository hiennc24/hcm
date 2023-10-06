import { BusinessSectorModel } from "../models/businessSector.model";
import { IBusinessSectorDoc } from "../types";

const getList = async (filter: { [x: string]: any }, option?: any): Promise<any> => {
  return BusinessSectorModel.paginate(filter, option);
};

const getAll = async (filter: { [x: string]: any }): Promise<IBusinessSectorDoc[]> => {
  return BusinessSectorModel.find(filter);
};

export const businessSectorService = {
  getList,
  getAll,
}
