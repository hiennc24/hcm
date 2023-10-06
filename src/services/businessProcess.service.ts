import { BusinessProcessModel } from "../models";
import { IBusinessProcessDoc } from "../types";

const createBusinessProcess = async (body: any): Promise<IBusinessProcessDoc | null> => {
  return BusinessProcessModel.create(body);
};

const updateById = async (entityId: string, body: any): Promise<IBusinessProcessDoc | null> => {
  return BusinessProcessModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getList = async (filter: { [x: string]: any }, option?: any): Promise<IBusinessProcessDoc[]> => {
  return BusinessProcessModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};

const getAll = async (filter: { [x: string]: any }): Promise<IBusinessProcessDoc[]> => {
  return BusinessProcessModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const getCount = async (valueChainId: string): Promise<number> => {
  return BusinessProcessModel.find({
    valueChainId,
    deletedById: { $exists: false }
  }).count()
};

const reSortList = async (valueChainId: string): Promise<IBusinessProcessDoc[]> => {
  return getList({
    valueChainId,
    deletedById: { $exists: false }
  }, {
    sort: {
      position: 1
    }
  });
};

const getOne = async (filter: any): Promise<IBusinessProcessDoc | null> => {
  return BusinessProcessModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });
};


export const businessProcessService = {
  createBusinessProcess,
  updateById,
  getOne,
  getList,
  reSortList,
  getCount,
  getAll,
}
