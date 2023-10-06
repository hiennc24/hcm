import { BscDetailModel } from "../models";
import { IBscDetailDoc } from "../types";

// const create = async (body: any,): Promise<IBscDetailDoc | null> => {
//   return BscDetailModel.create(body);
// };
const createOrUpdate = async (filter: any, update: any): Promise<IBscDetailDoc | null> => {
  return BscDetailModel.findOneAndUpdate({
    ...filter,
    deletedById: { $exists: false }
  }, update, {
    upsert: true, setDefaultsOnInsert: true, new: true
  })
};

const getAll = async (filter: any): Promise<IBscDetailDoc[]> => {
  return BscDetailModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ createdAt: 1 });
};

const updateOne = async (filter: any, update: any): Promise<IBscDetailDoc | null> => {
  const data = await BscDetailModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    },
    update,
    {
      new: true
    }
  )
  return data;
}

const getOne = async (filter: any): Promise<IBscDetailDoc | null> => {
  return BscDetailModel.findOne({
    ...filter,
    deletedById: { $exists: false }
  });
};

export const bscDetailService = {
  createOrUpdate,
  getAll,
  updateOne,
  getOne,
}
