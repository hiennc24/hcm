import { salaryLevelsPopulateFields } from "../config/populateConfigs";
import { SalaryLevelModel } from "../models";
import { ISalaryLevelDoc } from "../types";

const createSalaryLevel = async (body: any): Promise<ISalaryLevelDoc | null> => {
  return SalaryLevelModel.create(body);
};

const deleteMany = async (body: any): Promise<any> => {
  return SalaryLevelModel.deleteMany(body);
};

const initManySalaryLevel = async (salaryGradeId: string, newLevelArr: {
  salaryGradeId: string,
  jumpFactor: number,
  factor: number,
  createdById: string,
}[]): Promise<any> => {
  await deleteMany({
    salaryGradeId
  });
  return Promise.all(newLevelArr.map((newLevel: any, index: number) => {
    createSalaryLevel({
      salaryGradeId,
      position: index,
      ...newLevel
    })
  }))
};

const unBaseSalaryLevelBase = async (
  salaryGradeId: string,
  salaryLevelId: string | undefined,
  updatedById: string,
): Promise<any> => {
  return SalaryLevelModel.updateMany({
    salaryGradeId,
    _id: { $ne: salaryLevelId }
  }, {
    isBaseFactor: false,
    updatedById
  });
};

const getLatestSalaryLevel = async (
  salaryGradeId: string,
): Promise<any> => {
  return SalaryLevelModel
    .findOne({
      salaryGradeId,
      deletedById: { $exists: false },
    })
    .sort('-factor');
};

const changeSalaryLevelBase = async (
  salaryGradeId: string,
  salaryLevelId: string,
  updatedById: string,
): Promise<any> => {
  const data = await Promise.all([
    unBaseSalaryLevelBase(salaryGradeId, salaryLevelId, updatedById),
    SalaryLevelModel.findByIdAndUpdate(salaryLevelId, {
      isBaseFactor: true,
      updatedById
    }, {
      new: true
    }),
  ])
  return data[1];
};

const querySalaryLevels = async (salaryGradeId: string): Promise<ISalaryLevelDoc[]> => {
  return SalaryLevelModel.find({
    salaryGradeId,
    deletedById: { $exists: false },
  }, undefined, {
    sort: {
      position: 1
    }
  })
  // .select(salaryLevelsPopulateFields)
};

const updateSalaryLevel = async (entityId: string, body: any): Promise<ISalaryLevelDoc | null> => {
  return SalaryLevelModel.findByIdAndUpdate(entityId, body, { new: true });
};

const reCalculatorFactor = async (salaryGradeId: string, baseFactorValue: number): Promise<any> => {
  const levels = await querySalaryLevels(salaryGradeId)

  const cumulativeSum = (sum => (value: any) => sum += value)(0);
  const cumulativeSum2 = (sum => (value: any) => sum += value)(0);

  const arr11 = levels
    .filter(lv => lv.position >= 0)
  const arr12 = arr11.map(lv => lv.jumpFactor)
    .map(cumulativeSum)

  const arr21 = levels
    .filter(lv => lv.position < 0)
    .sort((a, b) => b.position - a.position)
  const arr22 = arr21.map(lv => lv.jumpFactor)
    .map(cumulativeSum2)

  const values = await Promise.all([
    Promise.all(
      arr12.map((jumpAsBase, index) => {
        console.log("jumpAsBase", jumpAsBase)
        console.log("arr12[0]", arr12[0])
        return SalaryLevelModel.findByIdAndUpdate(
          arr11[index].id,
          {
            position: index,
            factor: baseFactorValue + (index == 0
              ? 0
              : arr12[index - 1])
          },
          { new: true }
        )
      })
    ),
    Promise.all(
      arr22.map((jumpAsBase, index) => SalaryLevelModel.findByIdAndUpdate(
        arr21[index].id,
        {
          position: -(index + 1),
          factor: baseFactorValue - jumpAsBase
        },
        { new: true }
      ))
    ),
  ])

  return values
};

const reUseBaseJumpFactor = async (salaryGradeId: string, baseFactorValue: number, baseJumpFactor: number): Promise<any> => {
  const levels = await querySalaryLevels(salaryGradeId);
  const baseLevelIndex = levels.findIndex(lv => !!lv.isBaseFactor)

  return Promise.all(levels.map((lv, lIndex) => {
    return updateSalaryLevel(lv.id, {
      factor: baseFactorValue + (baseJumpFactor * (lIndex - baseLevelIndex)),
      jumpFactor: baseJumpFactor
    })
  }))
};

const updatePercentLcbForAllLevel = async (gradeId: string, percentLcb: number): Promise<any> => {
  return SalaryLevelModel.updateMany({ salaryGradeId: gradeId }, {
    percentLcb, percentKpi: 100 - percentLcb
  });
};

const getOne = async (filter: object): Promise<any> => {
  return SalaryLevelModel.findOne({
    ...filter,
    deletedById: { $exists: false },
  });
};

const getBaseLevel = async (salaryGradeId: string): Promise<any> => {
  return getOne({
    isBaseFactor: true,
    salaryGradeId
  });
};

export const salaryLevelService = {
  getOne,
  querySalaryLevels,
  createSalaryLevel,
  updateSalaryLevel,
  changeSalaryLevelBase,
  reCalculatorFactor,
  deleteMany,
  initManySalaryLevel,
  getLatestSalaryLevel,
  unBaseSalaryLevelBase,
  updatePercentLcbForAllLevel,
  getBaseLevel,
  reUseBaseJumpFactor,
}
