import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { dutyService } from '../services/duty.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await dutyService.createDuty({
      ...req.body,
      departmentId: req.query.departmentId
    });
    res.send(data)
  } catch (error: any) {
    next(error.message)
  }
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await dutyService.updateById(
    req.params.dutyId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const companyId = req.companyId;
  const { search, departmentId } = pick(req.query, ['search', 'departmentId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await dutyService.getList({ search, departmentId, companyId }, options);
  res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await dutyService.deleteDuty(
    req.params.dutyId, req.body,
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

export const dutyController = {
  getList,
  create,
  update,
  dedete,
}
