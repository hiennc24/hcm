import { CategoryCashFlowModel } from "../models";
import { IcategoryCashFlowDoc } from "../types";

const create = async (body: any): Promise<IcategoryCashFlowDoc | null> => {
  return CategoryCashFlowModel.create(body);
};

const getById = async (entityId: string, entityKey: string): Promise<IcategoryCashFlowDoc | null> => {
  return CategoryCashFlowModel.findOne({
    _id: entityId,
    key: entityKey,
    deletedById: { $exists: false }
  });
};

const updateOne = async (entityId: string, entityKey: string, body: any): Promise<IcategoryCashFlowDoc | null> => {
  console.log("bodybody", body)
  return CategoryCashFlowModel.findOneAndUpdate(
    {
      _id: entityId,
      key: entityKey,

      deletedById: { $exists: false }
    }, body, { new: true });
};
const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return CategoryCashFlowModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};


const getAll = async (administrationListId: string, entityKey: string, filter: { [x: string]: any }): Promise<IcategoryCashFlowDoc[]> => {
  return CategoryCashFlowModel.find({
    ...filter,
    administrationListId,
    key: entityKey,
    parentId: { $exists: false },
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const deleteMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return CategoryCashFlowModel.updateMany({
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
  return CategoryCashFlowModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const categoryCashFlowService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  deleteMany,
  updateMany,
}
