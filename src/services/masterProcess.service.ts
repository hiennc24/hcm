import { MasterProcessModel } from "../models";
import { IMasterProcessDoc } from "../types";

const create = async (body: any): Promise<IMasterProcessDoc | null> => {
  return MasterProcessModel.create(body);
};

const getById = async (entityId: string): Promise<IMasterProcessDoc | null> => {
  return MasterProcessModel.findById(entityId);
};

const updateById = async (entityId: string, body: any): Promise<IMasterProcessDoc | null> => {
  const entity: any = await MasterProcessModel.findById(entityId);
  Object.keys(body).forEach(key => {
    entity[key] = body[key]
  })
  // return MasterProcessModel.findByIdAndUpdate(entityId, body, { new: true, runValidators: true });
  await entity.save()
  return entity
};

const getTree = async (): Promise<IMasterProcessDoc[]> => {
  return MasterProcessModel.find({
    parentId: { $exists: false },
    deletedById: { $exists: false },
  });
};

export const masterProcessService = {
  create,
  getById,
  updateById,
  getTree,
}
