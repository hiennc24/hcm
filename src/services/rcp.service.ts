import { RCPModel } from "../models";
import { IRCPDoc } from "../types";

const create = async (body: any): Promise<IRCPDoc | null> => {
  return RCPModel.create(body);
};

const getById = async (entiryId: string): Promise<IRCPDoc | null> => {
  return RCPModel.findOne({
    _id: entiryId,
    deletedById: { $exists: false }
  })
};

const updateById = async (entiryId: string, body: any): Promise<IRCPDoc | null> => {
  return RCPModel.findOneAndUpdate({
    _id: entiryId
  }, body, { new: true });
};

const deleteById = async (entiryId: string, deletedById: string): Promise<IRCPDoc | null> => {
  return RCPModel.findOneAndUpdate({
    _id: entiryId
  }, {
    deletedById,
    deletedAt: new Date()
  }, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return RCPModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAllListRCP = async (filter: { [x: string]: any }): Promise<IRCPDoc[]> => {
  return RCPModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

export const rcpService = {
  getById,
  create,
  deleteById,
  updateById,
  getCount,
  getAllListRCP
}
