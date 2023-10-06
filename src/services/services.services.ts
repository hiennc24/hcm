import { ServicesModel } from "../models";
import { IServicesDoc } from "../types";

const create = async (body: any): Promise<IServicesDoc | null> => {
  return ServicesModel.create(body);
};

const getById = async (entityId: string): Promise<IServicesDoc | null> => {
  return ServicesModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IServicesDoc | null> => {
  console.log("bodybody", body)
  return ServicesModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return ServicesModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IServicesDoc[]> => {
  return ServicesModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IServicesDoc[]> => {
  const oldList = await ServicesModel.find({
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
  return ServicesModel.updateMany(
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
  return ServicesModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const servicesService = {
  getAll,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder,
  deleteMany,
  updateMany
}
