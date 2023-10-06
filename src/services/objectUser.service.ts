import { ObjectUserModel } from "../models";
import { IObjectUserDoc } from "../types";

const create = async (body: any): Promise<IObjectUserDoc | null> => {
  return ObjectUserModel.create(body);
};

const getById = async (entityId: string): Promise<IObjectUserDoc | null> => {
  return ObjectUserModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IObjectUserDoc | null> => {
  console.log("bodybody", body)
  return ObjectUserModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ObjectUserModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IObjectUserDoc[]> => {
  return ObjectUserModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IObjectUserDoc[]> => {
  const oldList = await ObjectUserModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
  return Promise.all(oldList.map((pG, index) => {
    pG.position = index;
    return pG.save()
  }))
};

export const objectUserService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
}
