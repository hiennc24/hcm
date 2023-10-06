import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { salaryConfigService } from '../services/salaryConfig.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const createConfig = catchAsync(async (req: Request, res: Response) => {
  const folder = await salaryConfigService.createSalaryConfig({
    ...req.body,
  });
  res.send(folder)
});

const updateConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await salaryConfigService.updateSalaryConfig(req.companyId, req.body);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getSalaryConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("11111", req.salaryConfig)
  res.send(req.salaryConfig);
});

export const salaryConfigController = {
  getSalaryConfig,
  createConfig,
  updateConfig,
}
