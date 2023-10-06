import { SalePlanDetailModel } from "../models/salePlanDetail.model";
import { ISalePlanDetailDoc } from "../types";

const create = async (planSaleId: string, body: any): Promise<ISalePlanDetailDoc | null> => {
  return SalePlanDetailModel.create({ ...body, planSaleId });
};

const getAll = async (filter: { [x: string]: any }): Promise<ISalePlanDetailDoc[]> => {
  return SalePlanDetailModel.find({
    deletedById: { $exists: false },
    ...filter,
  }).sort({ updatedAt: 1 });
};


const getById = async (salePlanDetailId: string): Promise<ISalePlanDetailDoc | null> => {
  return SalePlanDetailModel.findOne({
    _id: salePlanDetailId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (salePlanDetailId: string, body: any): Promise<ISalePlanDetailDoc | null> => {
  console.log("bodybody", body)
  return SalePlanDetailModel.findOneAndUpdate(
    {
      _id: salePlanDetailId,
      deletedById: { $exists: false }
    }, body, { new: true });
};

export const salePlanDetailService = {
  getById,
  create,
  updateOne,
  getAll
}
