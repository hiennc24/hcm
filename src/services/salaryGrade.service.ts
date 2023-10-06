import { SalaryGradeModel } from "../models/salaryGrade.model";
import { BASE_FACTOR_TYPES, ISalaryGradeDoc } from "../types";
import mongoose from 'mongoose';
import { salaryLevelService } from ".";
import { DEFAULT_JUMP_FACTOR } from "../config/defaultValue";

const createSalaryGrade = async (body: any): Promise<ISalaryGradeDoc | null> => {

  const newSalaryGradeId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId();
  const {
    baseFactorType, baseFactorValue,
    useBaseJumpFactor, baseJumpFactor
  } = body;

  const intLevelsCount = 7;
  const jumpFactor = useBaseJumpFactor
    ? baseJumpFactor
    : DEFAULT_JUMP_FACTOR;

  const startFactor = baseFactorType == BASE_FACTOR_TYPES.BASE_FACTOR_STARTING
    ? baseFactorValue
    : baseFactorValue - jumpFactor * ((intLevelsCount - 1) / 2)

  const [data, data2] = await Promise.all([
    SalaryGradeModel.create({
      _id: newSalaryGradeId,
      ...body
    }),
    salaryLevelService.initManySalaryLevel(
      newSalaryGradeId.toString(),
      (new Array(intLevelsCount).fill(1)).map((v: any, index: number) => {
        const factor = startFactor + index * jumpFactor;
        return {
          salaryGradeId: newSalaryGradeId.toString(),
          position: index,
          jumpFactor,
          factor: factor,
          isBaseFactor: factor == baseFactorValue,
          createdById: body.createdById,
        }
      })
    )
  ]);
  return data;
};

const getCountSalaryGrade = async (companyId: string, salaryConfigId: string): Promise<number> => {
  return SalaryGradeModel.find({
    companyId,
    salaryConfigId,
  }).count();
};

const updateSalaryGrade = async (companyId: string, body: any): Promise<ISalaryGradeDoc | null> => {
  return SalaryGradeModel.findOneAndUpdate({
    companyId
  }, body, { new: true });
};

const updateSalaryGradeById = async (entityId: any, updateBody: any) => {
  return SalaryGradeModel.findByIdAndUpdate(entityId, updateBody, {
    new: true
  });
};

const updateOneSalaryGrade = async (filter: any, updateBody: any) => {
  return SalaryGradeModel.findOneAndUpdate(filter, updateBody, {
    new: true
  });
};

const getById = async (entityId: string) => {
  return SalaryGradeModel.findById(entityId);
};

const getOne = async (filter: any) => {
  return SalaryGradeModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });
};

const getSalaryGradesInConfig = async (configId: string, filter?: any) => {
  return SalaryGradeModel.find({
    salaryConfigId: configId,
    deletedById: { $exists: false },
    ...!!filter ? filter : {}
  }, undefined, {
    sort: {
      position: 1
    }
  })
};

export const salaryGradeService = {
  getOne,
  getById,
  createSalaryGrade,
  updateSalaryGrade,
  getCountSalaryGrade,
  updateSalaryGradeById,
  updateOneSalaryGrade,
  getSalaryGradesInConfig,
}
