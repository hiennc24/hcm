import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { companyConfigsService } from '../services';
import ApiError from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';

const setSalaryConfigType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await companyConfigsService.setSalaryConfigType(req.companyId, req.body.useStartingSalary)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Company Not found'));
  }
  res.send(data);
});

const addRegionConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await companyConfigsService.addRegionConfig(req.companyId, req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Company Not found'));
  }
  res.send(data);
});

const updateRegionConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await companyConfigsService.updateRegionConfig(req.companyId, req.params.regionId, req.body)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Company Not found'));
  }
  res.send(data);
});

const deleteRegionConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await companyConfigsService.deleteRegionConfig(req.companyId, req.params.regionId)
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Company Not found'));
  }
  res.send(data);
});

const getAllRegionConfig = catchAsync(async (req: Request, res: Response) => {
  res.send(req.companyInfo.salaryConfigs.regionBased);
});

const getInsurances = catchAsync(async (req: Request, res: Response) => {
  res.send(req.companyInfo.insurances);
});

const updateInsurance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { insurances }: any = req.companyInfo;
  const {
    isuraceType,
    payType,
    percent,
  } = req.body;

  if (
    insurances[isuraceType].total - insurances[isuraceType][payType] + percent > 100
  ) {
    return next(new ApiError(httpStatus.NOT_FOUND, `insurances.${isuraceType}_total_exceeds`));
  }
  const data = await companyConfigsService.updateInsurance(
    req.companyId,
    isuraceType,
    payType,
    percent,
  )
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'company.not_found'));
  }
  res.send(data?.insurances);
});

export const companyConfigsController = {
  setSalaryConfigType,
  addRegionConfig,
  updateRegionConfig,
  deleteRegionConfig,
  getAllRegionConfig,
  getInsurances,
  updateInsurance
}
