import { ObjectListModel } from "../models";
import { IObjectListDoc } from "../types";

const create = async (body: any): Promise<IObjectListDoc | null> => {
  return ObjectListModel.create(body);
};

const getById = async (entityId: string): Promise<IObjectListDoc | null> => {
  return ObjectListModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IObjectListDoc | null> => {
  console.log("bodybody", body)
  return ObjectListModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ObjectListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IObjectListDoc[]> => {
  return ObjectListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IObjectListDoc[]> => {
  const oldList = await ObjectListModel.find({
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
  return ObjectListModel.updateMany(
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
  return ObjectListModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const objectListService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
  deleteMany,
  updateMany,
}
