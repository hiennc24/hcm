import { CommodityListModel } from "../models";
import { ICommodityListDoc } from "../types";

const create = async (body: any): Promise<ICommodityListDoc | null> => {
  return CommodityListModel.create(body);
};

const getById = async (entityId: string): Promise<ICommodityListDoc | null> => {
  return CommodityListModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};
const updateOne = async (filter: { [x: string]: any }, body: any): Promise<ICommodityListDoc | null> => {
  console.log("bodybody", body)
  return CommodityListModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return CommodityListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};
const getAll = async (filter: { [x: string]: any }): Promise<ICommodityListDoc[]> => {
  return CommodityListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<ICommodityListDoc[]> => {
  const oldList = await CommodityListModel.find({
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
  return CommodityListModel.updateMany(
    {
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
  return CommodityListModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const commodityListService = {
  getById,
  create,
  updateOne,
  getCount,
  getAll,
  rearrangeOrder,
  deleteMany,
  updateMany,
}
