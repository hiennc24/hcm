import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { salaryConfigService } from '../services/salaryConfig.service';
import ApiError from '../utils/ApiError';

export async function salaryConfigMid(req: Request, res: Response, next: any) {
  const salaryConfig = await salaryConfigService.getConfigByCompanyId(req.companyId)
  if (!salaryConfig) return next(new ApiError(httpStatus.BAD_REQUEST, "salary_config.not_found"));
  req.salaryConfigId = salaryConfig.id;
  req.salaryConfig = salaryConfig;
  next()
}
