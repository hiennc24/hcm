import mongoose from "mongoose";
import { TargetBscModel } from "../models"
import { BSC_TARGET_ACTION, ITargetBscDoc } from "../types";

const createTarget = async (body: any): Promise<ITargetBscDoc> => {
  return TargetBscModel.create(body);
}


const getTarget = async (bscCategoryKey: string, filter: { [x: string]: any }): Promise<ITargetBscDoc[]> => {
  const data = await TargetBscModel.find(
    {
      bscCategoryKey,
      ...filter,
      deletedById: { $exists: false }
    }

  )
  return data;
}

const updateOneTarget = async (filter: any, body: any): Promise<ITargetBscDoc | null> => {
  const data = await TargetBscModel.findByIdAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    },
    {
      ...body,
    },
    {
      new: true
    }
  )

  return data;
}

const deleteOneTarget = async (filter: any, body: any): Promise<ITargetBscDoc | null> => {
  const data = await TargetBscModel.findByIdAndUpdate(
    {
      ...filter,
      deletedById: { $exists: false }
    },
    {
      ...body
    },
    {
      new: true
    }
  )

  return data;
}

const getOneTarget = async (filter: any,): Promise<ITargetBscDoc | null> => {
  return TargetBscModel.findOne({
    ...filter,
    deletedById: { $exists: false }
  });
};

const getAllSplitUp = async (companyId: string,): Promise<any> => {
  const allSplitUp = await TargetBscModel.aggregate([
    {
      $match: {
        companyId: new mongoose.Types.ObjectId(companyId),
        deletedById: { $exists: false, },
        action: BSC_TARGET_ACTION.PLAN,
      }
    },
    {
      $project: {
        splitUpKey: 1,
        _id: 0
      }
    },
    {
      $unwind: {
        path: '$splitUpKey'
      }
    },
    {
      $group: {
        _id: '$splitUpKey'
      }
    }
  ]);
  return allSplitUp.map(splitUp => splitUp._id)
};

export const bscTargetService = {
  createTarget,
  getTarget,
  updateOneTarget,
  deleteOneTarget,
  getOneTarget,
  getAllSplitUp,
}