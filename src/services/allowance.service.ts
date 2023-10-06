import { AllowanceModel } from "../models/allowance.model";
import { IAllowanceDoc } from "../types";

const create = async (body: any): Promise<IAllowanceDoc | null> => {
  return AllowanceModel.create(body);
};

// const getConfigByCompanyId = async (companyId: any): Promise<IAllowanceDoc | null> => {
//   return AllowanceModel.findOne({
//     companyId: companyId
//   });
// };

const update = async (entityId: string, body: any): Promise<IAllowanceDoc | null> => {
  const {
    updatedById,
    shortName,

    valueConstant,
    valueFormula,
  } = body;

  if (!!shortName) {
    const data = await AllowanceModel.findById(entityId);
    if (!!data) {
      data.shortName = shortName;
      data.updatedById = updatedById
      await data.save();
      return data;
    } else {
      return null
    }
  } else {
    return AllowanceModel.findByIdAndUpdate(entityId, {
      ...body,
      ...!!valueConstant
        ? {
          useValueConstant: true,
          valueConstant,
          ...{ $unset: { valueFormula: "" } }
        }
        : {},
      ...!!valueFormula
        ? {
          useValueConstant: false,
          valueFormula,
          ...{ $unset: { valueConstant: "" } }
        }
        : {}
    }, { new: true })
  }
};

const getCount = async (filter: { [x: string]: any }): Promise<number> => {
  return AllowanceModel.find({
    ...filter,
    deletedById: { $exists: false }
  }).count()
};

const getList = async (filter: { [x: string]: any }, option: any): Promise<IAllowanceDoc[]> => {
  return AllowanceModel.paginate({
    ...filter,
    deletedById: { $exists: false }
  }, {
    ...option,
    sort: {
      position: 1
    }
  });
};

const getAll = async (filter: { [x: string]: any }, option: any): Promise<IAllowanceDoc[]> => {
  return AllowanceModel.find({
    ...filter,
    deletedById: { $exists: false }
  }, {
    ...option,
  }).sort({ position: 1 });
};

const deleteAllowance = async (entityId: string): Promise<IAllowanceDoc | null> => {
  const oldItem = await AllowanceModel.findByIdAndDelete(entityId)
  if (!oldItem) {
    return null;
  }

  await AllowanceModel.updateMany({
    salaryConfigId: oldItem.salaryConfigId,
    salaryGradeId: oldItem.salaryGradeId,
    position: { $gt: oldItem.position }
  }, {
    $inc: { position: -1 }
  })

  return oldItem;
};

export const allowanceService = {
  create,
  // getConfigByCompanyId,
  update,
  getCount,
  getList,
  getAll,
  deleteAllowance,
}
