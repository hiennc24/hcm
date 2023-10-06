import { ChannelModel } from "../models";
import { IChannelDoc } from "../types";

const create = async (body: any): Promise<IChannelDoc | null> => {
  return ChannelModel.create(body);
};

const getById = async (entityId: string): Promise<IChannelDoc | null> => {
  return ChannelModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IChannelDoc | null> => {
  console.log("bodybody", body)
  return ChannelModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ChannelModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IChannelDoc[]> => {
  return ChannelModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};


export const channelService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
}
