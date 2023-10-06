import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { accountSegmentService } from '../services/accountSegment.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await accountSegmentService.create({
    accountabilityId: req.params.accountabilityId,
    ...req.body
  });
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await accountSegmentService.update(
    req.params.accountabilityId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getInfo = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await accountSegmentService.getInfo(req.params.accountabilityId);

  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
})

export const accountSegmentController = {
  create,
  update,
  getInfo
}
