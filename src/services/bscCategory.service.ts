import { BscCategoryModel } from "../models";
import { BSC_CATEGORY_TYPE, ICategoryBscDoc } from "../types";

const getListCategory = async (filter: { [x: string]: any }): Promise<ICategoryBscDoc[]> => {
  return BscCategoryModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const updateCategory = async (companyId: string, bscCategoryKey: string, body: any): Promise<ICategoryBscDoc | null> => {
  const data = await BscCategoryModel.findOneAndUpdate(
    {
      bscCategoryKey,
      companyId,
      deletedById: { $exists: false }
    }, body,
    {
      new: true,
    }
  )

  return data;
}

const getDetail = async (companyId: string, bscCategoryKey: string): Promise<ICategoryBscDoc | null> => {
  return BscCategoryModel.findOne({
    bscCategoryKey,
    deletedById: { $exists: false }
  });
};

export const bscCategoryService = {
  // createListCategory,
  getListCategory,
  updateCategory, 
  getDetail,
}