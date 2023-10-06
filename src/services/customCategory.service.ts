import { CustomCategoryModel } from "../models";
import { IcustomCategoryDoc } from "../types";

const create = async (body: any): Promise<IcustomCategoryDoc | null> => {
  return CustomCategoryModel.create(body);
};

const getById = async (entityId: string): Promise<IcustomCategoryDoc | null> => {
  return CustomCategoryModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IcustomCategoryDoc | null> => {
  console.log("bodybody", body)
  return CustomCategoryModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return CustomCategoryModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (key:string,filter: { [x: string]: any }): Promise<IcustomCategoryDoc[]> => {
  return CustomCategoryModel.find({

    key,
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const deleteMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return CustomCategoryModel.updateMany(
    {
      _id: { $in: ids },
      deletedById: { $exists: false }
    },
    {
      $set: { ...body }
    },
    { new: true });
};

const updateMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return CustomCategoryModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const customCategoryService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  deleteMany,
  updateMany,
}
