import { AccountabilityModel } from "../models";
import { DutyModel } from "../models/duty.model";
import { IDutyDoc } from "../types";

const createDuty = async (body: any): Promise<IDutyDoc | null> => {
  return DutyModel.create(body);
};

const updateById = async (entityId: string, body: any): Promise<IDutyDoc | null> => {
  return DutyModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getList = async (filter: { [x: string]: string }, option: any): Promise<IDutyDoc[]> => {
  return DutyModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};

const deleteDuty = async(entityId: string, body: any): Promise<any> => {
  const data = await Promise.all([
    DutyModel.findByIdAndUpdate({
      _id: entityId,
    }, body, { new: true }),
    AccountabilityModel.updateMany({
      dutyId: entityId,
    }, body, { new: true})
  ])

  return data;
}

export const dutyService = {
  createDuty,
  updateById,
  getList,
  deleteDuty,
}
