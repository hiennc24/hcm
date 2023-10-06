import mongoose from "mongoose";
import { WorkInSegmentModel } from "../models";
import { IWorkInSegmentDoc } from "../types";

const create = async (body: any): Promise<IWorkInSegmentDoc | null> => {
  return WorkInSegmentModel.create(body);
};


const updateOne = async (filter: { [x: string]: any }, body: any): Promise<IWorkInSegmentDoc | null> => {
  console.log("bodybody", body)
  return WorkInSegmentModel.findOneAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    }, body, { new: true });
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return WorkInSegmentModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getAll = async (filter: { [x: string]: any }): Promise<IWorkInSegmentDoc[]> => {
  return WorkInSegmentModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
};

const getList = async (filter: { [x: string]: string }, option: any): Promise<IWorkInSegmentDoc[]> => {
  return WorkInSegmentModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};

const rearrangeOrder = async (filter: { [x: string]: any }): Promise<IWorkInSegmentDoc[]> => {
  const oldList = await WorkInSegmentModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).sort({ position: 1 });
  return Promise.all(oldList.map((pG, index) => {
    pG.position = index;
    return pG.save()
  }))
};

const groupByDepartment = async (
  companyId: string
): Promise<IWorkInSegmentDoc[]> => {
  const list = await WorkInSegmentModel.aggregate([
    {
      $match: {
        companyId: new mongoose.Types.ObjectId(companyId),
        deletedById: {
          $exists: false,
        }
      }
    },
    {
      $group:
      {
        _id: "$departmentId",
        entries: {
          $push: '$$ROOT',
        }
      }
    },
    // {
    //   $lookup: {
    //     from: "core_departments",
    //     localField: "_id",
    //     foreignField: "_id",
    //     as: "department",
    //     // justOne: true
    //   }
    // },
    // {
    //   $project: {
    //     "entries": 1,
    //     "department": { "$arrayElemAt": ["$department", 0] }
    //   }
    // }
  ]);
  return list;
};

const getById = async (entityId: string): Promise<IWorkInSegmentDoc | null> => {
  return WorkInSegmentModel.findOne({
    _id: entityId,
    deletedById: { $exists: false }
  });
};



// WorkInSegment
export const workInSegmentService = {
  groupByDepartment,
  getAll,
  getList,
  getById,
  create,
  updateOne,
  getCount,
  rearrangeOrder
}
