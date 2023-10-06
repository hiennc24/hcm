import { AdministrationListModel } from "../models";
import { IadministrationListDoc } from "../types";

const create = async (body: any): Promise<IadministrationListDoc | null> => {
  return AdministrationListModel.create(body);
};

const getById = async (entityId: string): Promise<IadministrationListDoc | null> => {
  return AdministrationListModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IadministrationListDoc | null> => {
  console.log("bodybody", body)
  return AdministrationListModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return AdministrationListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IadministrationListDoc[]> => {
  return AdministrationListModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const deleteMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return AdministrationListModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};
const updateMany = async (body: any): Promise<any> => {
  console.log("bodybody", body)
  const { ids } = body;
  return AdministrationListModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};
export const administrationListService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  deleteMany,
  updateMany,
}
