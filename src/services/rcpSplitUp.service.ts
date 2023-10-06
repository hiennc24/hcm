import { RCPSplitUpModel } from "../models/rcpSplitUp.model";
import { IRCPSplitUpDoc } from "../types";

const createOrUpdate = async (filter: object, update: object): Promise<IRCPSplitUpDoc | null> => {
  return RCPSplitUpModel.findOneAndUpdate(filter, update, {
    upsert: true, setDefaultsOnInsert: true, new: true
  })
};


// const getById = async (entiryId: string): Promise<IRCPSplitUpDoc | null> => {
//   return RCPSplitUpModel.findOne({
//     _id: entiryId,
//     deletedById: { $exists: false }
//   })
// };

// const updateById = async (entiryId: string, body: any): Promise<IRCPSplitUpDoc | null> => {
//   return RCPSplitUpModel.findOneAndUpdate({
//     _id: entiryId
//   }, body, { new: true });
// };

// const deleteById = async (entiryId: string, deletedById: string): Promise<IRCPSplitUpDoc | null> => {
//   return RCPSplitUpModel.findOneAndUpdate({
//     _id: entiryId
//   }, {
//     deletedById,
//     deletedAt: new Date()
//   }, { new: true });
// };

// const getCount = async (filter: { [x: string]: any }): Promise<number> => {
//   return RCPSplitUpModel.find({
//     ...filter,
//     deletedById: { $exists: false }
//   }).count()
// };

// const getAllListRCPSplitUp = async (filter: { [x: string]: any }): Promise<IRCPSplitUpDoc[]> => {
//   return RCPSplitUpModel.find({
//     ...filter,
//     deletedById: { $exists: false }
//   }).sort({ position: 1 });
// };
const getAll = async (filter: { [x: string]: any }, option?: any): Promise<IRCPSplitUpDoc[]> => {
  return RCPSplitUpModel.find({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};

export const rcpSplitUpService = {
  createOrUpdate,
  // getById,
  // deleteById,
  // updateById,
  // getCount,
  getAll
}
