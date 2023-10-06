import { SegmentModel } from "../models";
import { ISegmentDoc } from "../types";

const create = async (body: any): Promise<ISegmentDoc | null> => {
  return SegmentModel.create(body);
};

const getAll = async (filter: any): Promise<ISegmentDoc[]> => {
  return SegmentModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const updateById = async (entityId: string, body: any): Promise<ISegmentDoc | null> => {
  return SegmentModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const deleteSegment = async (finter: any, body: any): Promise<ISegmentDoc | null> => {
  const oldItem = await SegmentModel.findOneAndUpdate(finter, body)
  if (!oldItem) {
    return null;
  }

  await SegmentModel.updateMany({
    valueChainId: oldItem.valueChainId,
    businessProcessId: oldItem.businessProcessId,
    position: { $gt: oldItem.position },

    deletedById: { $exists: false }
  }, {
    $inc: { position: -1 }
  })

  return oldItem;
};

export const segmentService = {
  create,
  getAll,
  updateById,
  deleteSegment,
}
