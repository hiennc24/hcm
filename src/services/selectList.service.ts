import { SelectListModel } from "../models";
import { IselectListDoc } from "../types";

const create = async (body: any): Promise<IselectListDoc | null> => {
  return SelectListModel.create(body);
};

const getById = async (entityId: string): Promise<IselectListDoc | null> => {
  return SelectListModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IselectListDoc | null> => {
  console.log("bodybody", body)
  return SelectListModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};


const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return SelectListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IselectListDoc[]> => {
  return SelectListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};


export const selectListService = {
  getAll,
  getById,
  create, 
  updateOne,
  getCount
}
