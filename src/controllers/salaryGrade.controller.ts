import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { salaryGradeService, salaryLevelService } from '../services';
import { BASIC_SALARY_TYPES, SALARY_GRADE_TYPES } from '../types';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const createSalaryGrade = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { basicSalaryType, percentLcb, ...body } = req.body;
  // const { salaryGradeType } = req.salaryConfig;

  // if (
  //   (!!percentLcb && (salaryGradeType != SALARY_GRADE_TYPES.TEMPLATE03))
  //   || (!percentLcb && (salaryGradeType == SALARY_GRADE_TYPES.TEMPLATE03))
  // ) {
  //   return next(new ApiError(httpStatus.BAD_REQUEST, "salary_grade.template_notsupport"));
  // }

  let { basicSalaryValue } = req.body;
  if (basicSalaryType == BASIC_SALARY_TYPES.SALARY_BY_REGION) {
    basicSalaryValue = 4500000;
  }

  const sIndex = await salaryGradeService.getCountSalaryGrade(req.companyId, req.salaryConfigId)
  const data = await salaryGradeService.createSalaryGrade({
    ...body,
    percentLcb,
    basicSalaryType,
    basicSalaryValue,
    position: sIndex,
    salaryConfigId: req.salaryConfigId
  });
  res.send(data)
});

const updateSalaryGrade = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { percentLcb, useBaseJumpFactor, baseJumpFactor, basicSalaryType, ...others } = req.body;
  const { salaryGradeType, id: salaryConfigId } = req.salaryConfig;
  const { baseFactorValue } = req.salaryGrade;

  console.log("updateSalaryGrade", {
    salaryGradeType, percentLcb
  })

  if (
    !!percentLcb && (salaryGradeType != SALARY_GRADE_TYPES.TEMPLATE03)
  ) {
    return next(new ApiError(httpStatus.BAD_REQUEST, "salary_grade.template_notsupport"));
  }

  // eslint-disable-next-line prefer-const
  let percentObj = !!percentLcb ? { percentLcb, percentKpi: 100 - percentLcb } : {}


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line prefer-const
  if (
    useBaseJumpFactor != undefined
    && useBaseJumpFactor === true
  ) {
    const baseLevel = await salaryLevelService.getBaseLevel(req.params.salaryGradeId);
    if (!baseLevel) {
      return next(new ApiError(httpStatus.BAD_REQUEST, "salary_grade.basejumpfactor_notset"));
    }
  }

  const [data] = await Promise.all([
    salaryGradeService.updateOneSalaryGrade(
      {
        _id: req.params.salaryGradeId,
        salaryConfigId
      },
      {
        basicSalaryType,
        basicSalaryValue: basicSalaryType == BASIC_SALARY_TYPES.SALARY_BY_REGION
          ? 4500000
          : undefined,
        ...others,
        ...percentObj,
      }
    ),
    new Promise((resolve: any) => {
      if (!!percentLcb) {
        salaryLevelService.updatePercentLcbForAllLevel(req.params.salaryGradeId, percentLcb)
          .then(() => resolve())
      } else {
        resolve()
      }
    }),
    new Promise((resolve: any) => {
      if (
        useBaseJumpFactor != undefined
        && useBaseJumpFactor === true
        && !!baseJumpFactor
      ) {
        salaryLevelService.reUseBaseJumpFactor(req.params.salaryGradeId, baseFactorValue, baseJumpFactor)
          .then(() => resolve())
      } else {
        resolve()
      }
    }),
  ]);
  res.send(data);
});

const deleteSalaryGrade = catchAsync(async (req: Request, res: Response) => {
  const { deletedById } = req.body;
  await salaryGradeService.updateSalaryGradeById(
    req.params.salaryGradeId,
    {
      deletedById,
      deletedAt: new Date()
    }
  );

  const grades: any[] = await salaryGradeService.getSalaryGradesInConfig(
    req.salaryConfigId,
  );
  Promise.all(
    grades
      .map((g, index) => {
        return salaryGradeService.updateSalaryGradeById(g.id, {
          position: index
        })
      })
  )
    .then(() => {
      res.status(httpStatus.NO_CONTENT).send();
    })
});

const dragSalaryGrade = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { salaryGradeId } = req.params;
  const { after } = req.body;
  if (!salaryGradeId == after) {
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    // eslint-disable-next-line prefer-const
    let grades: any[] = await salaryGradeService.getSalaryGradesInConfig(
      req.salaryConfigId,
    );
    const oldIndex = grades.findIndex((g: any) => g.id == salaryGradeId)
    const afterIndex = grades.findIndex((g: any) => g.id == after)
    if (oldIndex == -1) {
      return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
    } else {
      grades
        .splice(afterIndex + 1, 0, { id: salaryGradeId, isNew: true })
      Promise.all(
        grades.filter((g: any) => (g.id != salaryGradeId || !!g.isNew))
          .map((g, index) => {
            return salaryGradeService.updateSalaryGradeById(g.id, {
              position: index
            })
          })
      )
        .then(() => {
          res.status(httpStatus.NO_CONTENT).send();
        })
    }
  }
});

const getSalaryGrades = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const grades: any[] = await salaryGradeService.getSalaryGradesInConfig(
    req.salaryConfigId,
  );
  res.send(grades);
});

const getSalaryGrade = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.send(req.salaryGrade);
});

export const salaryGradeController = {
  createSalaryGrade,
  updateSalaryGrade,
  getSalaryGrade,
  deleteSalaryGrade,
  dragSalaryGrade,
  getSalaryGrades,
}
