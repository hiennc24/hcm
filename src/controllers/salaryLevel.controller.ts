import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { allowanceService, salaryLevelService } from '../services';
import { BASE_FACTOR_TYPES, IAllowanceDoc, ISalaryGradeDoc, ISalaryLevelDoc, SALARY_GRADE_TYPES, TARGET_FORMULA_ALLOWANCE } from '../types';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const createSalaryLevel = catchAsync(async (req: Request, res: Response) => {
  const { percentLcb, ...body } = req.body;
  const { salaryGradeType } = req.salaryConfig;
  const { id: salaryGradeId, percentLcb: percentLcbGrade } = req.salaryGrade; //BASE_FACTOR_STARTING || BASE_FACTOR_CENTER

  const latestLevel = await salaryLevelService.getLatestSalaryLevel(salaryGradeId)
  const { position, factor, jumpFactor } = latestLevel;

  const data = await Promise.all([
    salaryLevelService.unBaseSalaryLevelBase(salaryGradeId, undefined, req.userId),
    salaryLevelService.createSalaryLevel({
      ...body,

      percentLcb: salaryGradeType != SALARY_GRADE_TYPES.TEMPLATE03 ? percentLcbGrade : percentLcb,
      position: position + 1,
      factor: factor + jumpFactor,
      jumpFactor,
      salaryGradeId
    })
  ])
  res.send(data[1])
});

const getSalaryLevels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [levels, allowances]: any = await Promise.all([
    salaryLevelService.querySalaryLevels(
      req.salaryGrade.id,
    ),
    allowanceService.getAll({
      salaryConfigId: req.salaryConfigId,
      ...(req.salaryConfig.salaryGradeType == SALARY_GRADE_TYPES.TEMPLATE03)
        ? { salaryGradeId: req.salaryGrade.id }
        : {}
    }, {})
  ]);

  const calculatorAllowance = (
    allowance: IAllowanceDoc,
    salaryGrade: ISalaryGradeDoc,
    salaryLevel: ISalaryLevelDoc
  ) => {

    const convertValue = (val: number) => {
      return {
        fieldKey: allowance.fieldKey,
        value: val
      }
    }

    if (allowance.useValueConstant) {
      return convertValue(allowance.valueConstant);
    } else {
      const { argument, percent } = allowance.valueFormula;
      // lương khởi điểm
      // const salary_by_lkd = (percent / 100) * salaryGrade.basicSalaryValue;
      const salary_by_lvt = salaryGrade.basicSalaryValue * salaryLevel.factor;
      switch (argument) {
        case TARGET_FORMULA_ALLOWANCE.LKD:
          return convertValue((percent / 100) * (salaryGrade.basicSalaryValue));
        // return convertValue(salary_by_lkd);
        case TARGET_FORMULA_ALLOWANCE.LVT:
          return convertValue((percent / 100) * salary_by_lvt);
        // return convertValue(salary_by_lvt);
        case TARGET_FORMULA_ALLOWANCE.KPI:
          return convertValue((percent / 100) * (salary_by_lvt * salaryLevel.percentKpi / 100));
        case TARGET_FORMULA_ALLOWANCE.LCB:
          return convertValue((percent / 100) * (salary_by_lvt * salaryLevel.percentLcb / 100));
        default:
          return convertValue(0);
      }
    }
  }

  const {
    basicSalaryValue,
    position,
    prefixGrade,
    // percentLcb,
  } = req.salaryGrade

  // res.send(allowances)
  res.send(levels.map((lv: any) => {
    const salary = basicSalaryValue * lv.factor;
    const lvVal = lv.toJSON();

    const getAllowances = () => {
      const allowanceArr = allowances.map((allowance: any) => {
        return calculatorAllowance(
          allowance,
          req.salaryGrade,
          lvVal
        )
      })

      // create a new empty object
      const obj: any = {};

      // copy array elements to th object
      for (let i = 0; i < allowanceArr.length; i++) {
        obj[allowanceArr[i].fieldKey] = allowanceArr[i].value;
      }

      return obj;

    }

    const allAllowances = getAllowances()
    const allowArr = Object.values(allAllowances);
    const salaryAllowances = allowArr.length == 0
      ? 0
      : allowArr.reduce((prev: any, next: any) => prev + next)

    return {
      ...lvVal,
      title: `${position + 1}.${lv.position + 1}`,
      name: `${prefixGrade}-B${lv.position + 1}`,
      salary: salary,
      salaryLcb: lv.percentLcb / 100 * salary,
      salaryKpi: lv.percentKpi / 100 * salary,
      allowances: allAllowances,
      salaryTotal: salary + Number(salaryAllowances),
    }
  }));
});

const changeSalaryLevelBase = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { salaryGradeId, salaryLevelId } = req.params;

  const data = await salaryLevelService.changeSalaryLevelBase(
    salaryGradeId, salaryLevelId,
    req.userId
  );
  res.send(data);
});

const updateSalaryLevel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { salaryGradeId, salaryLevelId } = req.params;
  const { percentLcb, jumpFactor } = req.body;
  const { baseFactorType, baseFactorValue } = req.salaryGrade;
  const { salaryGradeType } = req.salaryConfig;

  if (
    // nếu có truyền vào LCB, nhưng template đang là Template3 thì là lỗi
    !!percentLcb && (salaryGradeType == SALARY_GRADE_TYPES.TEMPLATE03)
  ) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "salary_grade.template_notsupport"));
  }

  if (baseFactorType == BASE_FACTOR_TYPES.BASE_FACTOR_CENTER) {
    // eslint-disable-next-line prefer-const
    let levels = await salaryLevelService.querySalaryLevels(salaryGradeId)
    const targetIndex = levels.findIndex(lv => lv.id == salaryLevelId)
    if (targetIndex == -1) {
      return next(new ApiError(httpStatus.BAD_REQUEST, "salary_level.not_found"))
    } else {
      levels[targetIndex].jumpFactor = jumpFactor

      if (levels[targetIndex].position == 0) {
        return next(new ApiError(httpStatus.BAD_REQUEST, "salary_level.cannot_delete_base_level"))
      } else if (levels[targetIndex].position < 0) {
        // levels[targetIndex].factor = factor;
        const totalFactor = levels
          .map(
            lv => lv.position < 0
              ? lv.jumpFactor
              : 0
          )
          .reduce((prev, next) => prev + next);
        if (totalFactor > baseFactorValue) {
          return next(new ApiError(httpStatus.BAD_REQUEST, "salary_level.factor_wrong"))
        }
      }
    }
  }

  await salaryLevelService.updateSalaryLevel(
    salaryLevelId, {
    ...req.body,
    ...!!percentLcb ? { percentLcb, percentKpi: 100 - percentLcb } : {}
  },
  );
  await salaryLevelService.reCalculatorFactor(salaryGradeId, baseFactorValue)
  res.status(httpStatus.NO_CONTENT).send()
});

const deleteSalaryLevel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id: salaryGradeId } = req.salaryGrade; //BASE_FACTOR_STARTING || BASE_FACTOR_CENTER

  const levels = await salaryLevelService.querySalaryLevels(salaryGradeId)
  if (levels.length <= 1) return next(new ApiError(httpStatus.BAD_REQUEST, "salary_level.cannot_delete_base_level"))

  const deleteItem = (levels.length % 2) == 0
    ? levels[0]
    : levels[levels.length - 1]

  await salaryLevelService.updateSalaryLevel(
    deleteItem.id,
    req.body,
  );
  res.status(httpStatus.NO_CONTENT).send()
});

export const salaryLevelController = {
  createSalaryLevel,
  getSalaryLevels,
  updateSalaryLevel,
  deleteSalaryLevel,
  changeSalaryLevelBase,
}
