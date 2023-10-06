import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { selectListService } from '../services/selectList.service';
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';

const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.body;
  const position = await selectListService.getCount({
    companyId
  })

  try {
    const data = await selectListService.create({ ...req.body, position });
    res.send(data)
  } catch (err: any) {
    return next(new ApiError(httpStatus.NOT_FOUND, err.message));
  }
});

const updateOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const selectListId = req.params.selectListId;
  const data = await selectListService.updateOne(
    { _id: req.params.selectListId, companyId: req.companyId }, req.body
  );
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'not_found'));
  }
  res.send(data)
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { searchJson, ...others }: any = req.query;
  const data = await selectListService.getAll({
    companyId: req.companyId,
    ...JSON.parse(searchJson?.toString() || "{}"),
    ...others
  });
  res.send(data)
});

const dedeteOne = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const [data] = await Promise.all([
    selectListService.updateOne(
      { _id: req.params.selectListId, companyId: req.companyId }, req.body
    ),
  ]);
  if (!data) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  }
  res.status(httpStatus.NO_CONTENT).send()
});

export const selectListController = {
  getAll,
  create,
  updateOne,
  dedeteOne,
}
