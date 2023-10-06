import { ProductGroupModel } from "../models";
import { IProductGroupDoc } from "../types";

const create = async (body: any): Promise<IProductGroupDoc | null> => {
  return ProductGroupModel.create(body);
};

const getById = async (entityId: string): Promise<IProductGroupDoc | null> => {
  return ProductGroupModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};


const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IProductGroupDoc | null> => {
  console.log("bodybody", body)
  return ProductGroupModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ProductGroupModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }, position: 1): Promise<IProductGroupDoc[]> => {
  return ProductGroupModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: position });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IProductGroupDoc[]> => {
  const oldList = await ProductGroupModel.find({
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
  return ProductGroupModel.updateMany(
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
  return ProductGroupModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const productGroupService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
  deleteMany,
  updateMany,
}
