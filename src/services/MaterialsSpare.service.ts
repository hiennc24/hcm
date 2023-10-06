import { MaterialsSpareModel } from "../models";
import { IMaterialsSpareDoc } from "../types";

const create = async (body: any): Promise<IMaterialsSpareDoc | null> => {
  return MaterialsSpareModel.create(body);
};

const getById = async (entityId: string): Promise<IMaterialsSpareDoc | null> => {
  return MaterialsSpareModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};

const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IMaterialsSpareDoc | null> => {
  console.log("bodybody", body)
  return MaterialsSpareModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};
// const updateOne = async (companyId: string, body: any): Promise<IMaterialsSpareDoc | null> => {
//   console.log("bodybody", body)
//   return MaterialsSpareModel.findOneAndUpdate({
//     companyId
//   }, body, { new: true });
// };
const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return MaterialsSpareModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};
const getAll = async (filter: { [x: string]: any }): Promise<IMaterialsSpareDoc[]> => {
  return MaterialsSpareModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IMaterialsSpareDoc[]> => {
  const oldList = await MaterialsSpareModel.find({
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
  return MaterialsSpareModel.updateMany(
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
  return MaterialsSpareModel.updateMany({
    _id: { $in: ids },
    deletedById: { $exists: false }
  }, {
    $set: { ...body }
  }, { new: true });
};

export const materialsSpareService = {
  getById,
  create,
  updateOne,
  getCount,
  getAll,
  rearrangeOrder,
  deleteMany,
  updateMany,
}
