import { BaseUnitModel } from "../models";
import { IBaseUnitDoc } from "../types";

const create = async (body: any): Promise<IBaseUnitDoc | null> => {
  return BaseUnitModel.create(body);
};

const getById = async (entityId: string): Promise<IBaseUnitDoc | null> => {
  return BaseUnitModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

// const getById = async (entityId: string, options = {
//   skipPersonnelPositions: true,
// }): Promise<any> => {
//   return BaseUnitModel
//     .findOne({
//       _id: entityId,
//       deletedById: { $exists: false }
//     }, undefined, options)
// };

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IBaseUnitDoc | null> => {
  console.log("bodybody", body)
  return BaseUnitModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return BaseUnitModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IBaseUnitDoc[]> => {
  return BaseUnitModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IBaseUnitDoc[]> => {
  const oldList = await BaseUnitModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
  return Promise.all(oldList.map((pG, index) => {
    pG.position = index;
    return pG.save()
  }))
};

export const baseUnitService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
}
