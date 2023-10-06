import { ValueChainModel } from "../models/valueChain.model";
import { IValueChainDoc } from "../types";

const create = async (body: any): Promise<IValueChainDoc | null> => {
  return ValueChainModel.create(body);
};

const getList = async (filter: any, option: any): Promise<IValueChainDoc[]> => {
  return ValueChainModel.find({
    ...filter,
    deletedById: { $exists: false },
  }, option, {
    sort: {
      updatedAt: 1
    }
  })
};

const update = async (entityId: string, body: any): Promise<IValueChainDoc | null> => {
  return ValueChainModel.findByIdAndUpdate(entityId, body, { new: true });
};

const getOne = async (filter: any): Promise<IValueChainDoc | null> => {
  return ValueChainModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });
};

export const valueChainService = {
  getOne,
  create,
  update,
  getList,
}
