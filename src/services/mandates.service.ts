import { MandatesModel } from "../models";
import { IMandatesDoc } from "../types";

const createMandates = async (body: any): Promise<IMandatesDoc | null> => {
  return MandatesModel.create(body);
};

const updateById = async (entityId: string, body: any): Promise<IMandatesDoc | null> => {
  return MandatesModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getAll = async (filter: { [x: string]: string }): Promise<IMandatesDoc[]> => {
  return MandatesModel.find({
    ...filter,
    deletedById: { $exists: false }
  });
};

export const mandatesService = {
  createMandates,
  updateById,
  getAll,
}
