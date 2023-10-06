import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { businessProcessService, valueChainService } from '../services';
import ApiError from '../utils/ApiError';

export async function inValueChangeMid(req: Request, res: Response, next: any) {
  const valueChange = await valueChainService.getOne({
    _id: req.params.valueChainId,
    companyId: req.companyId
  })
  if (!valueChange) return next(new ApiError(httpStatus.BAD_REQUEST, "value_change.not_found"));
  next()
}

export async function inBusinessProcessMid(req: Request, res: Response, next: any) {
  const valueChange = await businessProcessService.getOne({
    _id: req.params.businessProcessId,
    valueChainId: req.params.valueChainId
  })
  if (!valueChange) return next(new ApiError(httpStatus.BAD_REQUEST, "business_process.not_found"));
  next()
}

