import { CategorySpendingModel } from "../models";
import { IcategorySpendingDoc } from "../types";

const create = async (body: any): Promise<IcategorySpendingDoc | null> => {
  return CategorySpendingModel.create(body);
};

const getById = async (entityId: string,entityKey:string): Promise<IcategorySpendingDoc | null> => {
  return CategorySpendingModel.findOne({
    _id: entityId,
    key:entityKey,
    deletedById: { $exists: false }
  });
};


const updateOne = async (entityId: string,entityKey:string,body: any): Promise<IcategorySpendingDoc | null> => {
  console.log("bodybody", body)
  return CategorySpendingModel.findOneAndUpdate(
    {
      _id: entityId,
      key:entityKey,
      
      deletedById: { $exists: false }
    }, body, { new: true });
};


const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return CategorySpendingModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (administrationListId: string,entityKey:string,filter: { [x: string]: any }): Promise<IcategorySpendingDoc[]> => {
  return CategorySpendingModel.find({
    ...filter,
    administrationListId,
    key:entityKey,
    parentId: { $exists: false },
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const deleteMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return CategorySpendingModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

const updateMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return CategorySpendingModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const categorySpendingService = {
  getAll,
  getById,
  create, 
  updateOne,
  getCount,
  deleteMany,
  updateMany,
}
