import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';
import { mandatesService } from '../services/mandates.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await mandatesService.createMandates(req.body);
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await mandatesService.updateById(
    req.params.mandatesId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['search']);
  const data = await mandatesService.getAll(filter);
  res.send(data)
});

export const mandatesController = {
  getAll,
  create,
  update,
}
