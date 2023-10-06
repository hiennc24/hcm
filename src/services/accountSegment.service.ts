import { AccountSegmentModel } from "../models";
import { IAccountSegmentDoc } from "../types";

const create = async (body: any): Promise<IAccountSegmentDoc | null> => {
  return AccountSegmentModel.create(body);
};

const update = async (accountabilityId: string, body: any): Promise<IAccountSegmentDoc | null> => {
  return AccountSegmentModel.findOneAndUpdate({
    accountabilityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getInfo = async (accountabilityId: string): Promise<IAccountSegmentDoc | null> => {
  return AccountSegmentModel.findOne({
    accountabilityId,
    deletedById: { $exists: false }
  })
}

export const accountSegmentService = {
  create,
  update,
  getInfo,
}
