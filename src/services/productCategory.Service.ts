import { ProductCategoryModel } from "../models";
import { IProductCategoryDoc } from "../types";

const create = async (body: any): Promise<IProductCategoryDoc | null> => {
  return ProductCategoryModel.create(body);
};

const getById = async (entityId: string): Promise<IProductCategoryDoc | null> => {
  return ProductCategoryModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IProductCategoryDoc | null> => {
  console.log("bodybody", body)
  return ProductCategoryModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ProductCategoryModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IProductCategoryDoc[]> => {
  return ProductCategoryModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IProductCategoryDoc[]> => {
  const oldList = await ProductCategoryModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
  return Promise.all(oldList.map((pG, index) => {
    pG.position = index;
    return pG.save()
  }))
};

const deleteMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return ProductCategoryModel.updateMany(
    {
      _id: { $in: ids },
      deletedById: { $exists: false }
    },
    {
      $set: { ...body }
    },
    {
      new: true
    });
};

const updateMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return ProductCategoryModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const productCategoryService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
  deleteMany,
  updateMany,
}
