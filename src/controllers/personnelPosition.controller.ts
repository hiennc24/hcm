import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { personnelPositionService } from '../services/personnelPosition.service';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { pick } from '../utils/pick';

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await personnelPositionService.createPersonnelPosition({
    departmentId: req.params.departmentId,
    ...req.body,
  });
  res.send(data)
});

const update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await personnelPositionService.updateById(
    req.params.personnelPositionId, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getList = catchAsync(async (req: Request, res: Response) => {
  const departmentId = req.params.departmentId;
  const filter = pick(req.query, ['amplitude', 'typesOfEmployment', 'createdById']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await personnelPositionService.getList(departmentId, filter, options);
  res.send(data)
});

const dedete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const data = await personnelPositionService.updateById(
    req.params.personnelPositionId, req.body,
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.send(data)
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson }: any = req.query;
  const departmentId = req.params.departmentId
  const data = await personnelPositionService.getAll(departmentId, JSON.parse(searchJson?.toString() || "{}"),);
  res.send(data)
});

const getAllPosition = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, ...others }: any = req.query;
  const data = await personnelPositionService.getAllPosition({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),

    ...others
  });
  res.send(data)
});

export const personnelPositionController = {
  getList,
  create,
  update,
  dedete,
  getAll, getAllPosition
}
