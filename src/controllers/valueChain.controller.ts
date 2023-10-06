import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { valueChainService } from '../services/valueChain.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await valueChainService.create(req.body);
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await valueChainService.update(
    req.params.valueChainId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['createdById']);
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await valueChainService.getList(filter, option);
  res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await valueChainService.update(
    req.params.valueChainId, req.body,
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

export const valueChainController = {
  getList,
  create,
  update,
  dedete,
}
