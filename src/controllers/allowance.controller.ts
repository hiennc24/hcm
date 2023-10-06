import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { allowanceService } from '../services/allowance.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { SALARY_GRADE_TYPES } from '../types';
import { pick } from '../utils/pick';
import { AllowanceModel } from '../models';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { salaryGradeId } = req.query;
  if (
    (
      req.salaryConfig.salaryGradeType == SALARY_GRADE_TYPES.TEMPLATE03
      && !salaryGradeId
    )
    || (
      req.salaryConfig.salaryGradeType != SALARY_GRADE_TYPES.TEMPLATE03
      && !!salaryGradeId
    )
  ) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Template not support!'));
  } else {
    const position = await allowanceService.getCount({
      salaryGradeId,
      salaryConfigId: req.salaryConfig
    })
    const data = await allowanceService.create({
      ...req.body,
      position,
      salaryGradeId,
      salaryConfigId: req.salaryConfig
    });
    res.send(data)
  }
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await allowanceService.update(
    req.params.allowanceId,
    {
      ...req.body,
    });
  // let data: any = await AllowanceModel.findById(req.params.allowanceId);
  // data.shortName = "ssssss as"
  // await data.save()
  // if (!data) {
  //   return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  // }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const { salaryConfigId } = req;
  const { salaryGradeId } = pick(req.query, ['salaryGradeId']);
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await allowanceService.getAll({
    salaryConfigId, salaryGradeId
  }, option);
  res.send(data)
});

const deleteAllowance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await allowanceService.deleteAllowance(req.params.allowanceId)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const allowanceController = {
  create,
  update,
  getList,
  deleteAllowance,
}
