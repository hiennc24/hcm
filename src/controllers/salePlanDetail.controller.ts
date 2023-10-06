import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { salePlanDetailService } from '../services';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await salePlanDetailService.create(req.params.planSaleId, req.body)
    res.send(data)
  } catch (error: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, error.message));
  }
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const data = await salePlanDetailService.getAll({
    companyId: req.companyId,
  });
  res.send(data)
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await salePlanDetailService.updateOne(req.params.salePlanDetailId, req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'plan_sale_detail.not_found'));
  }
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await salePlanDetailService.updateOne(req.params.salePlanDetailId, req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

const getdetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await salePlanDetailService.getById(req.params.salePlanDetailId);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'plan_sale_detail.not_found'));
  }
  res.send(data)
});

export const salePlanDetailController = {
  create,
  updateOne,
  dedeteOne,
  getdetail,
  getAll
}
