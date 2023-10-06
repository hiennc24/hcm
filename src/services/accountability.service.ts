import { AccountabilityModel } from "../models/accountability.model";
import { IAccountabilityDoc, MANDATE_KEY } from "../types";

const createAccountability = async (body: any): Promise<any> => {
  return AccountabilityModel.create(body);
};

const updateById = async (entityId: string, body: any): Promise<IAccountabilityDoc | null> => {
  return AccountabilityModel.findOneAndUpdate({
    _id: entityId,
    deletedById: { $exists: false }
  }, body, { new: true });
};

const getList = async (filter: { [x: string]: string }, option: any): Promise<IAccountabilityDoc[]> => {
  return AccountabilityModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};
const getAll = async (filter: { [x: string]: any }, option?: any): Promise<IAccountabilityDoc[]> => {
  return AccountabilityModel.find({
    ...filter,
    deletedById: { $exists: false }
  }, option);
};

const addMandate = async (filter: any, personnelPositionId: string, mandateKey: string): Promise<IAccountabilityDoc | null> => {
  const accountability = await AccountabilityModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });

  if (!accountability) {
    return null;
  }

  if (
    accountability.mandates.findIndex(mandate => mandate.personnelPositionId.toString() == personnelPositionId) > -1
  ) {
    return AccountabilityModel.findOneAndUpdate({
      ...filter,
      deletedById: { $exists: false },
      "mandates.personnelPositionId": personnelPositionId
    }, {
      $addToSet:
      {
        "mandates.$.mandateKey": mandateKey
      }
    }, { new: true });
  } else {
    return AccountabilityModel.findByIdAndUpdate(accountability._id, {
      mandates: {
        personnelPositionId, mandateKey
      }
    }, { new: true });
  }
};

const removeMandate = async (filter: any, personnelPositionId: string, mandateKey: string): Promise<IAccountabilityDoc | null> => {
  const accountability = await AccountabilityModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });

  if (!accountability) {
    return null;
  }

  if (
    accountability.mandates.findIndex(mandate => mandate.personnelPositionId.toString() == personnelPositionId) > -1
  ) {
    // console.log("accountability.mandates 1 ", accountability.mandates)
    // console.log("accountability.mandates 2 ", accountability.mandates
    //   .find(mandate => mandate.personnelPositionId.toString() == personnelPositionId)
    //   ?.mandateKey.filter((mK: MANDATE_KEY) => mK != mandateKey))
    return AccountabilityModel.findOneAndUpdate({
      ...filter,
      deletedById: { $exists: false },
      "mandates.personnelPositionId": personnelPositionId
    }, {
      $set:
      {
        "mandates.$.mandateKey": accountability.mandates
          .find(mandate => mandate.personnelPositionId.toString() == personnelPositionId)
          ?.mandateKey.filter((mK: MANDATE_KEY) => mK != mandateKey)
      }
    }, { new: true });
  } else {
    return accountability;
  }
};

export const accountabilityService = {
  createAccountability,
  updateById,
  getList, getAll,

  addMandate, removeMandate
}
